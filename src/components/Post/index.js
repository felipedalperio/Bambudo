import { View, Text, Image, TouchableOpacity, FlatList, StatusBar, SafeAreaView, Alert } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../config/firebaseconfig'
import { color } from '../../config/color';
import likePost from '../../components/likePost/likePost';
import { ThemeContext } from '../../store/ThemeContext'

export default function Post({ item, database, post, setPost }) {
  const userRedux = useSelector(selectUser);
  const navigation = useNavigation();
  const [like, setLike] = useState(false)
  const [num, setNum] = useState(item.whoLiked.length)
  const [commentsCount, setCommentsCount] = useState(item.comments)
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    setLike(item.whoLiked.includes(userRedux.id))
    setNum(item.whoLiked.length)
  }, [item.whoLiked.includes(userRedux.id)])


  const likePostMethod = async (value) => {
    setLike(value)
    likePost(item, userRedux.id, value) //salvando no banco
    if (value == false) {
      setNum(num == 0 ? 0 : num - 1)
    } else {
      setNum(num + 1)
    }
  }

  const removePost = () => {
    Alert.alert(
      'Deseja Excluir ?',
      'Deseja excluir a postagem: ' + item.title ,
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Sim', onPress: () => deletePost(item.id) },
      ],
      { cancelable: true }
    );
};


  const deletePost = async (id) => {
    database.collection('posts').doc(id).delete().then(() => {
      database.collection("users").doc(userRedux.id).update({
        myPosts: firebase.firestore.FieldValue.arrayRemove(id)
      });
    }).catch((err) => {
      Alert.alert('Oops, algo deu errado.')
    });
    const updatedList = post.filter((item) => item.id !== id);
    setPost(updatedList);
  }

  const goSinglePost = () => {
    navigation.navigate('SinglePost', { post: item, like: like, numberLikes: num, setNumHome: setNum, setLikeHome: setLike, setCommentsCount: setCommentsCount })
  }
  return (
    <TouchableOpacity style={styles.post} onPress={() => goSinglePost()}>
      <View style={styles.catGroup}>
        <View style={styles.catLeft}>
          <Text style={{fontWeight: item.lock ? 'bold' : '400'}}>{item.lock ? 'Privado' : 'Público'}</Text>
        </View>
        <View style={styles.catRight}> 
          <TouchableOpacity onPress={() => removePost(item.id)}>
            {
              item.idUser == userRedux.id && (
                <Text style={styles.delete}>excluir</Text>
              )
            }
          </TouchableOpacity>
          <Text style={{ ...styles.cat, color: theme.textColor }}>{item.cat}</Text>
        </View>
      </View>
      <View style={styles.info}>
        {
          item.picture != "" ? (
            <Image style={styles.imgProfile} source={{ uri: item.picture }} />
          ) : (
            <Image style={styles.imgProfile} source={require('../../storage/default.png')} />
          )
        }
        <Text style={{ ...styles.name, borderColor: theme.primaryColor }}>{item.name}</Text>
        <Image style={styles.humor} source={{ uri: item.emoji }} />
      </View>
      <View style={styles.content}>
        <Text style={{ ...styles.title, color: theme.primaryColorDark2 }}>{item.title}</Text>
        <Text style={{ ...styles.desc, color: theme.textColor }} numberOfLines={9} ellipsizeMode="tail">{item.desc}</Text>
        <TouchableOpacity onPress={() => goSinglePost()}>
          <Text style={{ ...styles.more, color: theme.primaryColorDark2 }}>Ler mais.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoPost}>
        <View style={styles.left}>
          <Text>{item.data}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.iconButton}>
            {like ? (
              <Icon name='heart' size={20} color={theme.primaryColor} style={{ marginRight: 5 }} onPress={() => likePostMethod(false)} />
            ) : (
              <Icon name='heart-o' size={20} color={theme.primaryColor} style={{ marginRight: 5 }} onPress={() => likePostMethod(true)} />
            )}
            <Text>{num}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => goSinglePost()}>
            <Icon5 name='comment-alt' size={20} color={theme.primaryColor} style={{ marginLeft: 10, marginRight: 5 }} />
            <Text>{commentsCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

  )
}
