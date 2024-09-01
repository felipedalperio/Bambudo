import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList, Alert } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useContext, useEffect, useState } from 'react'
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebaseconfig';
import { ThemeContext } from '../../store/ThemeContext';
import { removeDuplicateSpaces } from '../../config/removeSpaces';

export default function Comment({ item, index, allComents, setListComments, idPost, updateNumComment }) {
  const [comentar, setComentar] = useState(false)
  const [text, setText] = useState("")
  const [list, setList] = useState(item.comments)
  const userRedux = useSelector(selectUser);
  const { theme } = useContext(ThemeContext);

  const sendComment = async () => {
    let textFilter = removeDuplicateSpaces(text)
    if(textFilter != ""){
      let data = {
        idUser: userRedux.id,
        picture: userRedux.picture,
        name: userRedux.name,
        comment: textFilter,
        like: 0,
        index: index
      }
      
      
      await firebase.firestore().collection("comments").doc(idPost).get().then((doc) => {
        let array = doc.data().commentList
        array[index].comments.push(data)
        firebase.firestore().collection("comments").doc(idPost).update({
          commentList: array
        }).then(() => {
          setList([...list, data])
          allComents[index].comments.push(data)
          setText("")
          setComentar(false)
        }).catch((err) => {
    
        });
      })
    }

  }

  const deleteComment = async () => {
    let listAux = [...allComents];

    await firebase.firestore().collection("comments").doc(idPost).update({
      commentList: firebase.firestore.FieldValue.arrayRemove(item)
    }).then(() => {
      let CommentUpdate = allComents.filter((doc) => doc !== item);
      setListComments(CommentUpdate)
      updateNumComment(false);
    }).catch((err) => {
      console.log("Comment: "+ err);
      Alert.alert('Oops, algo deu errado.')
    });
  }
  const deleteCommentComment = async (indexCom) => {
    let listAux = [...allComents[index].comments]; //pega todos os comentarios do comentario main
    let itemComent = listAux[indexCom]

    listAux.splice(indexCom, 1);
    setList(listAux)
    //setListComments(allComents)
    console.log(allComents)

    const docRef = firebase.firestore().collection('comments').doc(idPost);

    docRef.get().then((doc) => {
      let array1 = doc.data().commentList;
      array1[index].comments.splice(indexCom, 1);

      docRef.update({ commentList: array1 });
    });
  }

  useEffect(()=>{
    setList(item.comments)
  },[allComents])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper} keyboardShouldPersistTaps="always">
        <View style={styles.info}>
          <View style={styles.top}>
            {
              item.picture != "" ? (
                <Image source={{ uri: item.picture }} style={styles.picture} />
              ) : (
                <Image source={require('../../storage/default.png')} style={styles.picture} />
              )
            }
            
            <Text style={{...styles.name, color:theme.textColor}}>{item.name}</Text>
            {
              item.idUser == userRedux.id && (
                <TouchableOpacity onPress={() => deleteComment()}>
                  <Text style={styles.excluir}>Excluir</Text>
                </TouchableOpacity>
              )
            }
          </View>
          <Text style={{...styles.desc, color:theme.textColor}}>{item.comment}</Text>
          <View style={styles.likeOrComment}>
            <TouchableOpacity onPress={() => setComentar(!comentar)}>
              <Text style={{...styles.textCommentOrLike, color:theme.primaryColor }}>Responder</Text>
            </TouchableOpacity>
          </View>
          {comentar && (
            <KeyboardAvoidingView style={styles.form}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TextInput style={{...styles.inputText,  color:theme.textColor, borderBottomColor: theme.primaryColor }} placeholder="Digite aqui." onChangeText={(text) => setText(text)} value={text} />
              <TouchableOpacity style={{...styles.send, backgroundColor:theme.primaryColor }} onPress={() => sendComment()}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
      <View style={styles.commentCommentWrapper}>
        {
          list.map((item, index) => (

            <View style={styles.commentComment} key={index}>
              <View style={styles.info}>
                <View style={styles.top}>
                  <Image source={{ uri: item.picture }} style={styles.picture2} />
                  <Text style={{...styles.nameC, color:theme.textColor}}>{item.name}</Text>
                  {
                    item.idUser == userRedux.id && (
                      <TouchableOpacity onPress={() => deleteCommentComment(index)}>
                        <Text style={styles.excluir}>Excluir</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
                <Text style={{...styles.descC, color:theme.textColor}}>{item.comment}</Text>
              </View>
            </View>
          ))}
      </View>

    </View>
  )
}