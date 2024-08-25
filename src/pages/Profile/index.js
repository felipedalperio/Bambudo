import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import styles from './style';
import Post from '../../components/Post';
import firebase from '../../config/firebaseconfig';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { color } from '../../config/color';
import { ThemeContext } from '../../store/ThemeContext';
import { setUserCurrent } from '../../config/setUserCurrent';
import PostLoader from '../../components/PostLoader';

export default function Profile() {
  const userRedux = useSelector(selectUser);
  const database = firebase.firestore();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false)
  const { theme } = useContext(ThemeContext);
  const setUser = setUserCurrent();

useEffect(() => {
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const userDoc = await database.collection("users").doc(userRedux.id).get();
      
      if (userDoc.exists) {
        const myPosts = userDoc.data().myPosts || [];
        const list = [];
  
        // Alterado para buscar documentos com ordenação
        const postsQuery = database.collection("posts")
          .where(firebase.firestore.FieldPath.documentId(), 'in', myPosts)
          .orderBy('dataFilter', 'desc');
        
        const querySnapshot = await postsQuery.get();
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            list.push({ ...doc.data(), id: doc.id });
          }
        });
  
        setPost(list);
      }
    } catch (error) {
      Alert.alert('Oops, algo deu errado.');
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, [userRedux]);

  
  


  return (
    <View style={styles.container}>
      <View style={{...styles.titleGroup, backgroundColor:theme.primaryColor}}>
        <Text style={styles.textProfile}>Meus Posts</Text>
        <Icon name='pencil' size={20} color="white" style={{ marginLeft: 10 }} />
      </View>
      <View style={styles.posts}>
        {loading && (
          <PostLoader />
        )}
      
        {post.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={post}
            renderItem={({ item }) => {
              return (
                <Post item={item} database={database} post={post} setPost={setPost} />
              )
            }}
          />) : (
          <Text style={{...styles.empty, color:theme.textColor}}>
            { !loading && 'Você não possui nenhuma postagem, publique algo =D'}
          </Text>
        )
        }
      </View>
    </View>
  )
}