import { View, Text, Image, TouchableOpacity, FlatList, StatusBar, SafeAreaView, Alert } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../config/firebaseconfig'
import likePost from '../../controller/likePost/likePost';
import { ThemeContext } from '../../store/ThemeContext';

export default function PostLiked({ item, database, post }) {
  const userRedux = useSelector(selectUser);
  const navigation = useNavigation();
  const[like, setLike] = useState(false)
  const[num, setNum] = useState(item.likes);


  useEffect(() => {
    setLike(item.whoLiked.includes(userRedux.id))
  },[item.whoLiked.includes(userRedux.id)])

  const likePostMethod = async (value) => {
    try{
      setLike(value)
      await likePost(item, userRedux.id, value) //salvando no banco
      if(value == false){
        setNum(num == 0 ? 0 : num - 1)
      }else{
        setNum(num + 1)
      }
    }catch(err){

    }
  }

  const deletePost = async (id) => {
    database.collection('posts').doc(id).delete().then(() => {
      database.collection("users").doc(userRedux.id).update({
        myPosts: firebase.firestore.FieldValue.arrayRemove(id)
      });
    }).catch((err) => {
      Alert.alert('Oops, algo deu errado.')
    });
  }

  const goSinglePost = () => {
    navigation.navigate('SinglePost', { post: item, like: like })
  }
  return (
    <TouchableOpacity style={styles.post} onPress={() => goSinglePost()}>
      <View style={styles.catGroup}>
        <TouchableOpacity onPress={() => deletePost(item.id)}>
          {
            item.idUser == userRedux.id && (
              <Text style={styles.delete}>excluir</Text>
            )
          }
        </TouchableOpacity>
        <Text style={styles.cat}>{item.cat}</Text>
      </View>
      <View style={styles.info}>
        {
          item.picture != "" ? (
            <Image style={styles.imgProfile} source={{ uri: item.picture }} />
          ) : (
            <Image style={styles.imgProfile} source={require('../../storage/default.png')} />
          )
        }
        <Text style={styles.name}>{item.name}</Text>
        <Image style={styles.humor} source={{ uri: item.emoji }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={9} ellipsizeMode="tail">{item.desc}</Text>
        <TouchableOpacity onPress={() => goSinglePost()}>
          <Text style={styles.more}>Ler mais.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoPost}>
        <View style={styles.left}>
          <Text>{item.data}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.iconButton}>
            {like ? (
              <Icon name='heart' size={20} color="#5CC6BA" style={{ marginRight: 5 }} onPress={() => likePostMethod(false)} />
            ) : (
              <Icon name='heart-o' size={20} color="#5CC6BA" style={{ marginRight: 5 }} onPress={() => likePostMethod(true)}/>
            )}
            <Text>{num}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => goSinglePost()}>
            <Icon5 name='comment-alt' size={20} color="#5CC6BA" style={{ marginLeft: 10, marginRight: 5 }} />
            <Text>{item.commentList ? item.commentList.length : 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

  )
}
