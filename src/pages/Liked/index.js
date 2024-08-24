import { View, Text, FlatList,ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import Post from '../../components/Post';
import firebase from '../../config/firebaseconfig';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import PostLiked from '../../components/PostLiked';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../store/ThemeContext';
import { setUserCurrent } from '../../config/setUserCurrent';
import PostLoader from '../../components/PostLoader';

export default function Liked() {
  const userRedux = useSelector(selectUser);
  const database = firebase.firestore();
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState([])
  const { theme } = useContext(ThemeContext);
  const setUser = setUserCurrent();

  useEffect(() => {
    setLoading(true); // Definir loading para true ao iniciar a operação
  
    const fetchData = async () => {
      try {
        const docRef = await database.collection('users').doc(userRedux.id).get();
  
        if (docRef.exists) {
          const list = [];
          const reversedPostsLiked = [...docRef.data().postsLiked];
  
          await Promise.all(
            reversedPostsLiked.map(async (index) => {
              const doc = await database.collection("posts").doc(index).get();
  
              if (doc.exists && doc.data() && !doc.data().lock) {
                list.push({ ...doc.data(), id: doc.id });
              }
            })
          );
  
          setPost(list);
        }
  
        setLoading(false); // Certifique-se de definir loading como false após o loop
  
      } catch (err) {
        setLoading(false);
        Alert.alert('Oops, algo deu errado.');
      }
    };
  
    fetchData();
  }, [userRedux]);
  
  
  useEffect(() => {
    setLoading(true);
    setUser(userRedux.id);
  }, []);


/*
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: 1
    });
  }, [post]) */

  return (
    <View style={styles.container}>
      <View style={{...styles.titleGroup, backgroundColor:theme.primaryColor}}>
        <Text style={styles.textLiked}>Posts que você curtiu</Text>
        <Icon name='heart-o' size={20} color="white" style={{ marginLeft: 10 }} />
      </View>
      <View style={styles.posts}>
        {loading && (
          <PostLoader/>
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
          />
        )
        : (
            <Text style={{...styles.empty, color:theme.textColor}}>
              {!loading && 'Você não curtiu nenhuma publicação.'}
            </Text>
          )
        }
      </View>
    </View>
  )
}