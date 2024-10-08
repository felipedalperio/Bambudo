import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, FlatList, ScrollView, Alert, Keyboard, ActivityIndicator } from 'react-native'
import styles from './style'
import { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import IconFeather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebaseconfig'
import likePost from '../../controller/likePost/likePost'
import Comment from '../../components/Comment';
import { vh } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../config/color';
import { ThemeContext } from '../../store/ThemeContext';
import { removeDuplicateSpaces } from '../../config/removeSpaces';
import notification from '../../controller/notificationPost/notificationPost';
import { LikedContext } from '../../store/LikedContext';


export default function SinglePost({ route }) {
  const userRedux = useSelector(selectUser);
  const post = route.params.post;
  const navigation = useNavigation();
  const [commentText, setCommentText] = useState("");
  const [listComments, setListComments] = useState([]);
  const [like, setLike] = useState(route.params.like);
  const [commentsCount, setCommentsCount] = useState(0)
  const [lock, setLock] = useState(route.params.lock)
  const [sendLoading, setSendLoading] = useState(false);
  const [num, setNum] = useState(route.params.numberLikes);
  const [showPhoto, setShowPhoto] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { setReload} = useContext(LikedContext);
  
  const likeMethod = (value) => {
    setLike(value)
    setReload(true)
    if(route.params.setLikeHome){
      route.params.setLikeHome(value)
      likePost(post, userRedux.id, value)
      if (value == false) {
        let number = num == 0 ? 0 : num - 1
        setNum(number)
        route.params.setNumHome(number)
      } else {
        let number = num + 1;
        setNum(number)
        route.params.setNumHome(number)
        notification(0, userRedux, post);
      }
    }
  }

  const removePost = () => {
    Alert.alert(
      'Deseja Excluir ?',
      'Deseja excluir a postagem: ' + post.title,
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        { text: 'Sim', onPress: () => deletePost() },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    setCommentsCount(listComments.length)
  }, [listComments])

  const saveComment = async () => {
    let commentFilter = removeDuplicateSpaces(commentText)
    if (commentFilter != "") {

      setSendLoading(true)
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let data = {
        idUser: userRedux.id,
        picture: userRedux.picture,
        name: userRedux.name,
        comment: commentFilter,
        like: 0,
        comments: [],
        date: date
      }

      //timestamp: firebase.firestore.FieldValue.serverTimestamp(),

      await firebase.firestore().collection("comments").doc(post.id).get().then((doc) => {
        if (doc.exists) { //atualiza
          firebase.firestore().collection("comments").doc(post.id).update({
            commentList: firebase.firestore.FieldValue.arrayUnion(data)
          })
        } else { //cria
          firebase.firestore().collection("comments").doc(post.id).set({
            commentList: firebase.firestore.FieldValue.arrayUnion(data)
          })
        }
      }).then(() => {
        setCommentText("")
        Keyboard.dismiss()
        setSendLoading(false)
        setListComments([...listComments, data])
        updateNumComment(true)
        notification(1, userRedux, post);
      }).catch((error) => {
        console.log("SinglePost: " + error)
        Alert.alert('Oops, algo deu errado.')
        setSendLoading(false)
      });
    }

  }

  const updateNumComment = async (deleteOrInsert) => {
    let commentUpdate = 0;
    if (deleteOrInsert == true) { // insere
      commentUpdate = commentsCount + 1
    } else {
      commentUpdate = commentsCount > 0 ? commentsCount - 1 : 0
    }
    try {
      await firebase.firestore().collection("posts").doc(post.id).update({ comments: commentUpdate }).then(() => {
        route.params.setCommentsCount(commentUpdate)
      });
    } catch (err) {

    }
  }

  const deletePost = async () => {
    firebase.firestore().collection('posts').doc(post.id).delete().then(() => {
      firebase.firestore().collection("users").doc(userRedux.id).update({
        myPosts: firebase.firestore.FieldValue.arrayRemove(post.id)
      });
      navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
    }).catch((err) => {
      console.log("SinglePost: " + err)
      Alert.alert('Oops, algo deu errado.')
    });
  }

  const goUpdate = () => {
    navigation.goBack();
    navigation.navigate('NewPost', { post: post });
  }

  const updateLock = () => {
    if(route.params.setLock){
      setLock(!lock)
      route.params.setLock(!lock)
    }
  }

  const openImage = () => {
    setShowPhoto((previw) => !previw)
  }

  useEffect(() => {
    if (lock != post.lock) {
      firebase.firestore().collection('posts').doc(post.id).update({
        lock: lock,
      }).then(() => {

      }).catch((err) => {
        console.log("SinglePost: " + err)
        Alert.alert('Oops, algo deu errado.')
      });
    }
  }, [lock])

  useEffect(() => {
    const getComment = async () => {
      await firebase.firestore().collection("comments").doc(post.id).get().then((doc) => {
        if (doc.exists) {
          setListComments(doc.data().commentList)
        }
      })
    }
    getComment();
  }, [])

  return (
    <>
      {
        showPhoto && (
          <TouchableOpacity style={{ ...styles.showPicture, height: vh(100), }} onPress={() => openImage()}>
            <AntDesign style={{ color: "white", fontSize: 30, alignSelf: 'flex-end', margin: 10 }} name="close"/>
            {
              post.picture != "" ? (
                <Image style={styles.imageView} source={{ uri: post.picture }} />
              ) : (
                <Image style={styles.imageView} source={require('../../storage/default.png')} />
              )
            }
          </TouchableOpacity>
        )
      }
      <ScrollView style={{ ...styles.container, backgroundColor:theme.bgColor }} keyboardShouldPersistTaps="always">
        {
          userRedux.id === post.idUser && (
            <View style={styles.updateOrDelete}>
              <TouchableOpacity style={styles.viewUD} onPress={() => updateLock()}>
                <IconFeather name={lock ? 'lock' : 'unlock'} size={30} style={{ marginRight: 10, color: theme.textColor }} />
                <Text style={{color: theme.textColor}}>{lock ? 'Privado' : 'Público'}</Text>
              </TouchableOpacity>
              <View style={styles.viewUD}>
                <TouchableOpacity style={styles.buttonUpdate} onPress={() => goUpdate()}>
                  <Icon style={{ color: "white", fontSize: 20 }} name="edit" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDelete} onPress={() => removePost()}>
                  <Icon style={{ color: "white", fontSize: 18 }} name="trash-o" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        <View style={styles.user}>
          <TouchableOpacity  onPress={() => openImage()}>
          {
              post.picture != "" ? (
                <Image style={styles.imageProfile} source={{ uri: post.picture }}/>
              ) : (
                <Image style={styles.imageProfile} source={require('../../storage/default.png')}/>
              )
          }
          </TouchableOpacity>

          <View style={styles.infoUser}>
            <Text style={{ ...styles.name, borderColor: theme.primaryColor, color: theme.textColor}}>{post.name}</Text>
            <Text style={{ color: theme.textColor }}>{post.data}</Text>
          </View>
          <Image style={styles.humor} source={{ uri: post.emoji }} />
        </View>
        <View style={styles.content}>
          <View style={styles.top}>
            <Text style={{ ...styles.title, color: theme.textColor }}>{post.title}</Text>
            <Text style={{ ...styles.cat, color: theme.primaryColor }}>{post.cat}</Text>
          </View>
          <Text style={{ ...styles.desc, color: theme.textColor, }}>
            {post.desc}
          </Text>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.iconButton}>
              {like ? (
                <Icon name='heart' size={20} color={theme.primaryColor} style={{ marginRight: 5 }} onPress={() => likeMethod(false)} />
              ) : (
                <Icon name='heart-o' size={20} color={theme.primaryColor} style={{ marginRight: 5 }} onPress={() => likeMethod(true)} />
              )}
              <Text style={{color: theme.textColor}}>{num}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon5 name='comment' size={20} color={theme.primaryColor} style={{ marginLeft: 10, marginRight: 5 }} />
              <Text style={{color: theme.textColor}}>{commentsCount}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsWrapper}>
            <Text style={{ ...styles.titleComment, color: theme.textColor }}>Comentários:</Text>
            <View
              style={styles.formComment} >
              <TextInput placeholderTextColor={theme.textColor} onChangeText={(text) => setCommentText(text)} value={commentText} style={{...styles.inputComment, color: theme.textColor}} placeholder="Escreva um comentário." />
              <TouchableOpacity style={{ ...styles.buttonComment, backgroundColor: theme.primaryColor }} disabled={sendLoading} onPress={() => saveComment()}>
                {sendLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Icon name="send" style={styles.textButtonComment} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.commentsList}>
            {listComments && listComments.length > 0 ? (
              listComments.map((item, index) => (
                <Comment key={index} item={item} index={index} allComents={listComments} setListComments={setListComments} idPost={post.id} updateNumComment={updateNumComment} />
              ))
            ) : (
              <Text style={{color: theme.textColor}}>Nenhum comentário</Text>
            )}
          </View>
        </View>
      </ScrollView>

    </>
  )
}