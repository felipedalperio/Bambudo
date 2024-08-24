import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import Emojis from '../../components/Emojis'
import styles from './style'
import Menu from '../../components/Menu'
import Categories from '../../components/Categories'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import { ThemeContext } from '../../store/ThemeContext';

export default function NewPost({ route }) {
  const [show, setShow] = useState(false);
  const [catShow, setCatShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showUpdateBar, setShowUpdateBar] = useState(false);
  const [lock, setLock] = useState(false);
  const [emoji, setEmoji] = useState('https://firebasestorage.googleapis.com/v0/b/bambudo-935b5.appspot.com/o/emojis%2Fdefault%2Femoji10.png?alt=media&token=d342dff4-f43e-430e-91f5-4b1cd0f46f70');
  const [cat, setCat] = useState("História");
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    try{
      if(navigation){
        navigation?.setOptions({
          tabBarStyle: { display: 'none' },
        });
      }
    }catch(error){}
  }, []);

  const changeShow = () => {
    setShow(!show)
    setCatShow(false)
  }

  const changeShowCat = () => {
    setCatShow(!catShow)
    setShow(false)
  }

  useEffect(() => {
    try{
      if(navigation){
        const unsubscribe = navigation.addListener('blur', e => {
          route.params = {},
            setShowUpdateBar(null)
          setTitle(''),
            setDesc('')
        });
        return unsubscribe;
      }
    }catch(error){}

  }, []);

  useEffect(() => {
    paramsVerify()
  }, [route.params])

  const paramsVerify = () => {
    try{
      if (route.params) {
        if (route.params.post) {
          setTitle(route.params.post.title)
          setDesc(route.params.post.desc)
          setEmoji(route.params.post.emoji)
          setCat(route.params.post.cat)
          setShowUpdateBar(route.params.post)
          setLock(route.params.post.lock)
        } else {
          setTitle("")
          setDesc("")
          setShowUpdateBar(false)
        }
      } else {
        setTitle("")
        setDesc("")
        setShowUpdateBar(false)
      }
    }catch(err){

    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrapper} keyboardShouldPersistTaps="always">
      <Menu
        emoji={emoji}
        title={title}
        cat={cat}
        desc={desc}
        update={showUpdateBar}
        setDesc={setDesc}
        lock={lock}
        setTitle={setTitle} />

      {showUpdateBar && (
        <View style={{...styles.titleGroup, backgroundColor: theme.primaryColor }}>
          <Text style={styles.textTitle}>Você esta na tela de atualização</Text>
          <Icon name='edit' size={20} color="white" style={{ marginLeft: 10 }} />
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity style={styles.lockOrUnlockButton} onPress={() => setLock(!lock)}>
          {lock ? (
            <IconFeather name="lock" size={20} style={{ marginRight: 10 }} />
          ) : (
            <IconFeather name="unlock" size={20} style={{ marginRight: 10 }} />
          )}
          <Text>{lock ? 'Privado' : 'Público'}</Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionText} onPress={changeShowCat}>
            <Text>Catêgoria: </Text>
            <Text style={styles.catText}>{cat}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionText} onPress={changeShow}>
            <Text>Humor</Text>
            <Image style={styles.emoji} source={{ uri: emoji }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperOptions}>
          {show && (<Emojis setEmoji={setEmoji} setShow={setShow} theme={theme} />)}
          {catShow && (<Categories setCat={setCat} setCatShow={setCatShow} theme={theme} />)}
        </View>
        <View style={styles.wrapperInfo}>

          <TextInput placeholder='Título' style={{ ...styles.title, color: theme.primaryColorDark }} onChangeText={(text) => setTitle(text)} value={title} />
          <TextInput multiline={true} placeholder='Escreva algo legal :D' style={{ ...styles.desc }} onChangeText={(text) => setDesc(text)} value={desc} />

        </View>
      </View>
    </KeyboardAvoidingView>
  )
}