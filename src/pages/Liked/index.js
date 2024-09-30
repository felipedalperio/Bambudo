import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import Post from '../../components/Post';
import firebase from '../../config/firebaseconfig';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../../store/ThemeContext';
import PostLoader from '../../components/PostLoader';
import { LikedContext } from '../../store/LikedContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Liked() {
  const userRedux = useSelector(selectUser);
  const database = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); // Último documento visível
  const [hasMoreData, setHasMoreData] = useState(true);
  const [postsLiked, setPostsLiked] = useState([]);
  const [limit, setLimit] = useState(10); // Limite de posts por vez
  const [limitPost, setLimitPost] = useState(0); // Limite de posts por vez
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { reload, setReload } = useContext(LikedContext);
  const limitPorPost = 29

  // Fetch data and reset list when `reload` changes or component mounts
  useFocusEffect(
    useCallback(() => {
      if (reload) {
        setReload(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Liked' }],
        });
      }
    }, [reload])
  );

  const getPostsLiked = async () => {
    try {
      let myPosts = postsLiked;
      if (postsLiked.length > 0) {
        return postsLiked;
      } else {
        const userDoc = await database.collection('users').doc(userRedux.id).get();
        if (userDoc.exists) {
          myPosts = userDoc.data().postsLiked || [];
          setPostsLiked(myPosts)
        }
        return myPosts
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true); // Definir loading para true ao iniciar a operação
      if (!userRedux?.id) {
        setHasMoreData(false);
        setPost([]);
        return;
      }
      const myPosts = await getPostsLiked();
      const list = [];

      if (myPosts.length === 0) {
        // Usuário não tem postagens
        setHasMoreData(false);
        setPost([]);
        return;
      }

      // Pega os próximos 29 IDs restantes
      const nextPosts = myPosts.slice(limitPost, limitPost + limitPorPost);
      console.log(limitPost)
      console.log(nextPosts.length)


      if (nextPosts.length > 0) {

        let postsQuery = database.collection("posts")
          .where(firebase.firestore.FieldPath.documentId(), 'in', nextPosts)
          .limit(limit);

        if (lastVisible && !reload) {
          postsQuery = postsQuery.startAfter(lastVisible);
        }

        const querySnapshot = await postsQuery.get();
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            if (doc.exists && doc.data() && !doc.data().lock) {
              list.push({ ...doc.data(), id: doc.id });
            }
          });

          // Adiciona novos posts ao estado sem duplicar
          setPost(prevPosts => {
            const existingIds = new Set(prevPosts.map(post => post.id));
            const newPosts = list.filter(post => !existingIds.has(post.id));
            return [...prevPosts, ...newPosts];
          });

          // Atualiza o último documento visível
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        } else {

          // Avança para a próxima página
          setLimitPost(prevLimitPost => {
            const limitNextPage = prevLimitPost + limitPorPost;
            // Atualize o estado
            return limitNextPage;
          });

          // Verifica se há mais dados
          const newLimitPost = limitPost + limitPorPost;
          if (myPosts.slice(newLimitPost, newLimitPost + limitPorPost).length > 0) {
            setLastVisible(null)
            setHasMoreData(true);
          } else {
            setHasMoreData(false);
            console.log("acabou");
          }
        }
      }
    } catch (err) {
      Alert.alert('Oops, algo deu errado.');
      console.log("Liked: " + err)
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    //&& setLastVisible(null) - foi tirado
    if (!loading && hasMoreData) {
      console.log("handleLoadMore")
      fetchData();
    }
  };

  useEffect(() => {
    setReload(false);
    fetchData();
  }, [userRedux]);

  return (
    <View style={{...styles.container, backgroundColor: theme.bgColor }}>
      <View style={{ ...styles.titleGroup, backgroundColor: theme.primaryColor }}>
        <Text style={styles.textLiked}>Posts que você curtiu</Text>
        <Icon name='heart-o' size={20} color="white" style={{ marginLeft: 10 }} />
      </View>
      <View style={styles.posts}>
        {loading && !post.length ? (
          <PostLoader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={post}
            renderItem={({ item }) => (
              <Post item={item} database={database} post={post} setPost={setPost} />
            )}
            keyExtractor={item => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.9} // Ajuste conforme necessário
            ListFooterComponent={
              loading && (
                <PostLoader limit={true} />
              )
            }
            ListEmptyComponent={
              !loading && !post.length ? (
                <Text style={{ ...styles.empty, color: theme.textColor }}>
                  Você não curtiu nenhuma publicação.
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}
