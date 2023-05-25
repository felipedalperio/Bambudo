import { View, Text, TouchableOpacity, Image, TextInput, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import { selectUser } from '../../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { changeUser } from '../../store/userSlice';
import firebase from '../../config/firebaseconfig'
import { useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../store/ThemeContext';
import PalletaCores from '../PaletaCores';
import { setUserCurrent } from '../../config/setUserCurrent';
import { removeDuplicateSpaces } from '../../config/removeSpaces';


export default function Settings() {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [show, setShow] = useState(false)
  const [choose, setChoose] = useState(false)
  const userRedux = useSelector(selectUser);
  let dispatch = useDispatch()
  const route = useRoute();
  const { theme, changeTheme } = useContext(ThemeContext);
  const[color, setColor] = useState(null);
  const setUser = setUserCurrent();

  const handleThemeChange = newTheme => {
    if(color != null){
      saveColor(newTheme)
      getColorNum()
    }
  };

  function saveColor(colorNum) {
    let num = colorNum.toString()
    AsyncStorage.setItem('color', num).then(() => {
      changeTheme(colorNum);
    })
    .catch((error) => {
      Alert('Ops, Algo deu errado.')
    });
  }

  function getColorNum(){
      AsyncStorage.getItem('color').then((item)=>{
        if(item){
          setColor(parseInt(item))
        }else{
          setColor(0)
        }
      }).catch((error) => {
        Alert('Ops, Algo deu errado.')
        setColor(0)
      });
  }

  
  useEffect(() => {
    handleThemeChange(color);
  },[color])

  useEffect(() => {
    imagePicture()
  }, [])

  useEffect(() => {
    setUser(userRedux.id);
    setName(userRedux.name)
    setImage({ uri: userRedux.picture });
  },[userRedux])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if(result.uri){
      setImage({ uri: result.uri }),
      uploadImage({ uri: result.uri })
    }
      
  };

  const uploadImage = async (imageUp) => {
      setUploading(true);
      const response = await fetch(imageUp.uri);
      const blob = await response.blob();
      const filename = userRedux.id;
      var ref = firebase.storage().ref().child(filename).put(blob);

      try {
        await ref;
        setUploading(false);
        updateUser();
        Alert.alert('Dados Atualizados.')
      } catch (e) {
        Alert.alert('Algo deu errado.')
        setUploading(false);
      }
  }

  const updateUser = async () => {
    let imageUrl = "";
    let nome = removeDuplicateSpaces(name)
    await firebase.storage().ref(userRedux.id).getDownloadURL().then((url) => {
      imageUrl = url
    }).catch((err) => {
      Alert.alert('Erro ao fazer upload, tente novamente mais tarde.')
    })

    firebase.firestore().collection('users').doc(userRedux.id).update({
      name: nome,
      picture: imageUrl,
    }).then(() => {
      dispatch(changeUser(
        { ...userRedux, picture: imageUrl }
      ))
    }).catch((err) => {
      Alert.alert('Erro ao fazer upload, tente novamente mais tarde.')
    });


  }

  const updateNameUser = async () => {
    let nome = removeDuplicateSpaces(name);
    if(nome != ""){
      setChoose(true)
      firebase.firestore().collection('users').doc(userRedux.id).update({
        name: nome
      }).then(() => {
        dispatch(changeUser(
          { ...userRedux, name: nome }
        ))
        setChoose(false)
      }).catch((err) => {
        Alert.alert('Erro, tente novamente mais tarde.')
        setChoose(false)
      });
    }

  }

  const imagePicture = () => {
    setName(userRedux.name);
    //Image
    if (userRedux.picture != '') {
      setImage({ uri: userRedux.picture });
    } else {
      setImage(require('../../storage/default.png'))
    }

  }

  function logout() {
    AsyncStorage.setItem('userId', "").then(() => {
      dispatch(changeUser(
          {
              id: '',
              email: '',
              name: '',
              picture: '',
              postsLiked: '',
          }
      ))
      firebase.auth().signOut().then(() => {
        route.params.changeUserAuth(false)
      }).catch((error) => {
        Alert.alert('Oops, algo deu errado.')
      });
    });

  }

  const changeShow = () =>{
    setShow(!show)
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={{...styles.picture, borderColor:theme.primaryColor}} source={image} />
        <TouchableOpacity style={{...styles.icon, backgroundColor:theme.primaryColor}} onPress={pickImage} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />

          ) : (
            <Icon name="picture-o" size={20} color='white' />
          )}
        </TouchableOpacity>
      </View>
      <View style={{...styles.bottom, backgroundColor:theme.primaryColor}}>
        <Text style={styles.label}>Nome do Usuário</Text>
        <TextInput onChangeText={(text) => setName(text)} style={styles.name} placeholder="Digite seu nome" type="text" value={name} />
        <TouchableOpacity style={styles.save} onPress={updateNameUser} disabled={choose}>
          {choose ? (
            <ActivityIndicator size="small" color={theme.primaryColor}/>
          ): (
            <Text style={{...styles.textSave, color:theme.primaryColor}}> Salvar </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperColor} onPress={changeShow}>
            <Text style={styles.titleColor}>Cor do App</Text>
            <View style={styles.boxColor}>
              <View style={styles.paleta}>
                <View style={{...styles.box, backgroundColor: theme.primaryColorLight}}></View>
                <View style={{...styles.box, backgroundColor: theme.primaryColor, marginHorizontal:5}}></View>
                <View style={{...styles.box, backgroundColor: theme.primaryColorDark}}></View>
              </View>
              <IconEvil name='arrow-down' size={26} color="#515151"/>
            </View>
        </TouchableOpacity>
        {uploading && (
          <View style={styles.up}>
            <Icon name='warning' size={18} color={theme.textColor} />
            <Text style={styles.textUp}>Carregando, porfavor aguarde...</Text>
          </View>
        )}
        <TouchableOpacity style={styles.singout} onPress={logout}>
          <Text style={styles.textLogout}>Deslogar</Text>
          <Icon name="sign-out" size={26} color="white" />
        </TouchableOpacity>
      </View>
        {show && (<PalletaCores show={show} setShow={setShow} setColor={setColor} />)}
    </View>
  )
}