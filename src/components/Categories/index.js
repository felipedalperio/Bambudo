
import { Text, View, Image, TouchableOpacity,FlatList } from 'react-native';
import { cat } from '../../../data';
import { vh } from 'react-native-expo-viewport-units';
import styles from './style';

export default function Categories({setCat, setCatShow, theme}) {
  
  const chosenCat = (text) =>{
    setCat(text)
    setCatShow(false)
  }

  return (
    <View style={{...styles.container, maxHeight:vh(70), backgroundColor:theme.primaryColorLight}}>
      <Text style={{...styles.title, color:theme.textColor}}>Escolha uma categoria</Text>
      <View style={styles.CatGroup}>
        <FlatList
            data={cat}
            renderItem={({ item, key}) => {
              return (
                <TouchableOpacity onPress={() => chosenCat(item.name)} key={key} style={styles.button}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
      </View>
    </View>

  )
}
