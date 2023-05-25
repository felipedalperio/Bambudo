import { useEffect, useState } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  
} from 'react-native'
import Emojis from '../../components/Emojis'
import styles from './style'
import Menu from '../../components/Menu'
import Categories from '../../components/Categories'

export default function UpdatePost({ route }) {
  const[show,setShow] = useState(false);
  const[catShow,setCatShow] = useState(false);
  const[title,setTitle] = useState(route.params.post.title);
  const[desc,setDesc] = useState(route.params.post.desc);
  const[emoji,setEmoji] = useState(route.params.post.emoji);
  const[cat,setCat] = useState(route.params.post.cat);

  const changeShow = () =>{
    setShow(!show)
    setCatShow(false)
  }

  const changeShowCat = () =>{
    setCatShow(!catShow) 
    setShow(false)
  }

  return (
    <View style={styles.wrapper}>
      <Menu 
        emoji={emoji}
        title={title}
        cat={cat}
        desc={desc}
        route={route}
        setDesc={setDesc}
        setTitle={setTitle} />

      <View style={styles.container}>
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionText} onPress={changeShowCat}>
            <Text>Catêgoria: </Text>
            <Text style={styles.catText}>{cat}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionText} onPress={changeShow}>
            <Text>Humor</Text>
            <Image style={styles.emoji} source={{uri: emoji}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperOptions}>
          {show && (<Emojis setEmoji={setEmoji} setShow={setShow}/>)}
          {catShow && (<Categories setCat={setCat} setCatShow={setCatShow}/>)}
        </View>
        <View style={styles.wrapperInfo}>
          <TextInput placeholder='Título' style={styles.title} onChangeText={(text) => setTitle(text)} value={title}/>
          <TextInput multiline={true} placeholder='Escreva algo legal :D' style={styles.desc} onChangeText={(text) => setDesc(text)} value={desc}/>
        </View>
      </View>
    </View>
  )
}