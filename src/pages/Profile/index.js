import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { categoriesProfile } from '../../../data'

export default function Profile() {
  const userRedux = useSelector(selectUser);
  const database = firebase.firestore();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [postsMy, setPostsMy] = useState([]);
  const [limit, setLimit] = useState(10); // Limite de posts por vez
  const [limitPost, setLimitPost] = useState(0); // Limite de posts por vez
  const { theme } = useContext(ThemeContext);
  const [nameCat, setNameCat] = useState('Todos')
  const [showCat, setShowCat] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [userRedux, nameCat]);


  const getPostsMy = async () => {
    try {
      let myPosts = postsMy;
      if (postsMy.length > 0) {
        return postsMy;
      } else {
        const userDoc = await database.collection('users').doc(userRedux.id).get();
        if (userDoc.exists) {
          myPosts = userDoc.data().myPosts || [];
          setPostsMy(myPosts)
        }
        return myPosts
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if (!userRedux?.id) {
        setHasMoreData(false);
        setPost([]);
        return;
      }

      const myPosts = await getPostsMy();
      const list = [];

      if (myPosts.length === 0) {
        // Usuário não tem postagens
        setHasMoreData(false);
        setPost([]);
        return;
      }

      // Pega os próximos 29 IDs restantes
      const nextPosts = myPosts.slice(limitPost, limitPost + 29);
      console.log(limitPost)


      if (nextPosts.length > 0) {

        let postsQuery = database.collection("posts")
          .where(firebase.firestore.FieldPath.documentId(), 'in', nextPosts)
          .orderBy('dataFilter', 'desc')
          .limit(limit); // Limita a quantidade de posts retornados

        if (nameCat && nameCat !== 'Todos') {
          const lock = nameCat == 'Privado' ? true : false;
          postsQuery = postsQuery.where('lock', '==', lock);
        }

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
        } else {
          //Aqui a gente pasas para 
          let limitNextPage = limitPost + 29;
          setLimitPost(limitNextPage)  // proxima pagina
          if (myPosts?.slice(limitNextPage, limitNextPage + 29).length > 0) {
            setHasMoreData(true);
            setLastVisible(null)
          } else {
            setHasMoreData(false);
            console.log("acabou")
          }
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
    //&& setLastVisible(null) - foi tirado
    if (!loading && hasMoreData) {
      console.log("handleLoadMore")
      fetchPosts();
    }
  };


  const showCategories = () => {
    setShowCat(prev => !prev);
  };

  const chooseCat = (name) => {
    setShowCat(false);
    if (name !== nameCat) {
      setPost([]); //limpanmdo lista
      //setPostsMy([])
      setNameCat(name);
      setLastVisible(null);
      setHasMoreData(true);
      setScrollPosition(0);
      setLimitPost(0)
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.titleGroup, backgroundColor: theme.primaryColor }}>
        <Text style={styles.textProfile}>Meus Posts</Text>
        <Icon name='pencil' size={20} color="white" style={{ marginLeft: 10 }} />
      </View>
      <View style={styles.catWrapper}>
        <View style={{ ...styles.select, backgroundColor: theme.primaryColor }}>
          <TouchableOpacity style={styles.catTop} onPress={showCategories}>
            <Text style={styles.selectText}>{nameCat}</Text>
            <Icon name='caret-down' size={20} color="white" />
          </TouchableOpacity>
          <View style={{ ...styles.catBottom, height: showCat ? 'auto' : 0 }}>
            <View style={styles.slideCategorieWrapper}>
              <FlatList
                data={categoriesProfile}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.itemCat} onPress={() => chooseCat(item.name)}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
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

            keyExtractor={item => item.id}
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