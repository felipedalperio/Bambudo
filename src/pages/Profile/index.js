import { View, Text, FlatList, Alert } from 'react-native';
import styles from './style';
import Post from '../../components/Post';
import firebase from '../../config/firebaseconfig';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../store/ThemeContext';
import PostLoader from '../../components/PostLoader';
import { useFocusEffect, useNavigation  } from '@react-navigation/native';


export default function Profile() {
  const userRedux = useSelector(selectUser);
  const database = firebase.firestore();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true); 
  const [limit, setLimit] = useState(10); // Limite de posts por vez
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPosts();
  }, [userRedux]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if(!userRedux?.id ){
        setHasMoreData(false);
        setPost([]);
        return;
     }
      const userDoc = await database.collection("users").doc(userRedux.id).get();

      if (userDoc.exists) {
        const myPosts = userDoc.data().myPosts || [];
        const list = [];

        if (myPosts.length === 0) {
          // Usuário não tem postagens
          setHasMoreData(false);
          setPost([]);
          return;
        }

        let postsQuery = database.collection("posts")
          .where(firebase.firestore.FieldPath.documentId(), 'in', myPosts)
          .orderBy('dataFilter', 'desc')
          .limit(limit); // Limita a quantidade de posts retornados
        
        if (lastVisible) {
          postsQuery = postsQuery.startAfter(lastVisible);
        }

        const querySnapshot = await postsQuery.get();
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            if (doc.exists && doc.data()) {
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
        }else {
          setHasMoreData(false); // Marca que não há mais dados
        }
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Oops, algo deu errado.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && lastVisible && hasMoreData) {
      console.log("handleLoadMore")
      fetchPosts();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.titleGroup, backgroundColor: theme.primaryColor }}>
        <Text style={styles.textProfile}>Meus Posts</Text>
        <Icon name='pencil' size={20} color="white" style={{ marginLeft: 10 }} />
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
            initialNumToRender={10}

            keyExtractor={item=> item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1} // Ajuste conforme necessário
            ListFooterComponent={
              loading && (
                !lastVisible ? <PostLoader /> : <PostLoader limit={true} />
              )
            }
            ListEmptyComponent={
              !loading && !post.length ? (
                <Text style={{ ...styles.empty, color: theme.textColor }}>
                  Você não possui nenhuma postagem, publique algo =D
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}