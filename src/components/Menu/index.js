import styles from './style';
import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator, AppState, BackHandler } from 'react-native';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebaseconfig';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/ThemeContext';
import { removeDuplicateSpaces, removeFourSpaces } from '../../config/removeSpaces';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId =  TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function Menu({ title, desc, emoji, cat, setDesc, setTitle, update, lock }) {
  const userRedux = useSelector(selectUser);
  const navigation = useNavigation();
  const database = firebase.firestore();
  const [loading, setLoading] = useState(false)
  const [ads, setAds] = useState(false)
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  

  useEffect(() => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setAds(true)
          //Alert.alert('Entreei.')
      });
      // Start loading the interstitial straight away
      interstitial.load();
      // Unsubscribe from events on unmount
      return unsubscribe;
  }, [isFocused]);

  

  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  function dataSearch() {
    var data = new Date(),
      dia = data.getDate(),
      mes = data.getMonth(),
      ano = data.getFullYear()
    return ano + mes + dia
  }

  function newPost() {
    let titleFilter = removeDuplicateSpaces(title)
    let descFilter = removeDuplicateSpaces(desc)
    if (titleFilter != "" && descFilter != "") {
      if (update) {
        updatePost(update.id)
      } else {
        savePost()
      }

    }
  }

  async function savePost() {
    if(ads){
      interstitial.show();
    }
    setLoading(true)
    let titleFilter = removeDuplicateSpaces(title)
    let descFilter = removeFourSpaces(desc)
    await database.collection('posts').add({
      idUser: userRedux.id,
      name: userRedux.name,
      picture: userRedux.picture,
      title: titleFilter,
      desc: descFilter,
      emoji: emoji,
      cat: cat,
      likes: 0,
      comments: 0,
      lock:lock,
      data: dataAtualFormatada(),
      dataFilter: new Date(),
      whoLiked: [],
      commentList: []
    }).then((data) => {
      database.collection("users").doc(userRedux.id).update({
        myPosts: firebase.firestore.FieldValue.arrayUnion(data.id)
      }).then(() => {
        setDesc("");
        setTitle("");
        setLoading(false)
        setAds(false)
        navigation.navigate("Profile");
      }).catch((error) => {
        setLoading(false)
        setAds(false)
        database.collection('posts').doc(data.id).delete();
      });
    }).catch((error) => {
      setLoading(false)
      setAds(false)
      Alert.alert('Oops, algo deu errado.')
    });
  }

  async function updatePost(id){
    if(ads){
      interstitial.show();
    }
    let titleFilter = removeDuplicateSpaces(title)
    let descFilter = removeFourSpaces(desc)
    setLoading(true)
    database.collection('posts').doc(id).update({
        title: titleFilter,
        desc: descFilter,
        emoji: emoji,
        cat: cat,
        lock:lock,
        name: userRedux.name,
        picture: userRedux.picture,
    }).then((data) => {
      setDesc("");
      setTitle("");
      setLoading(false)
      setAds(false)
      navigation.navigate("Profile");
    }).catch((error) => {
      setLoading(false)
      setAds(false)
      Alert.alert('Oops, algo deu errado.')
    });
    
  }

  const onBeforeRemove = (e) => {
    if (isFocused) {
      if(e){
        e.preventDefault(); // impede a navegação padrão
      }
      Alert.alert(
        '⚠️ Deseja Sair ?',
        'Tem certeza que deseja sair sem salvar?',
        [
          { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
          { text: 'Sim', onPress: () => goBack() },
        ],
        { cancelable: true }
      );
      return true;
    }
  };


  const goBack = () => {
    BackHandler.removeEventListener('hardwareBackPress', onBeforeRemove);
    navigation.goBack()
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',onBeforeRemove);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBeforeRemove);
    }
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={onBeforeRemove}>
        <Icon5 name="arrow-left" size={20} color="#222" style={{marginRight:10}}/>
        <Text style={styles.title}>Postagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, backgroundColor:theme.primaryColor}} onPress={newPost} disabled={loading}>
        {loading ? (
          <ActivityIndicator size='small' color="#fff" style={styles.progressBar} />
        ) : (
          <Text style={styles.save}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>

  )
}
