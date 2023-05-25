import { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { emojis } from '../../../data';
import styles from './style';
import firebase from 'firebase/compat';

export default function Emojis({ setShow, setEmoji, theme }) {
  const [emojiList, setEmojiList] = useState(null);
  const [emojiSelect, setEmojiSelect] = useState("default");
  const [loading, setLoading] = useState(false);

  const chosenEmoji = (img) => {
    setEmoji(img)
    setShow(false)
  }

  const setEmojiss = (list) => {
    setEmojiList(list)
  }


  useEffect(() => {
    const database = () => {
      
      let list = [];
      setEmojiList(null)
      setLoading(true)
      firebase.storage().ref().child("emojis/" + emojiSelect).listAll().then((res) => {
        res.items.forEach((itemRef) => {
          firebase.storage().ref(itemRef.fullPath).getDownloadURL().then((url) => {
            list.push(url);
            setEmojiss([...list])
          })
        })
      }).then(() => {
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
      });
    }
    database();
  }, [emojiSelect])

  return (
    <View style={{ ...styles.container, backgroundColor: theme.primaryColorLight }}>
      <Text style={{ ...styles.title, color: theme.textColorDark }}>Como está seu humor?</Text>
      <View style={styles.emojiGroup}>
        {emojiList && (
          <FlatList
            data={emojiList}
            numColumns={6}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => chosenEmoji(item)}>
                  <Image
                    key={item}
                    source={{ uri: item }}
                    style={styles.imageEmoji}
                    PlaceholderContent={<ActivityIndicator size={20} color={theme.primaryColorDark} style={styles.progressBar} />}
                  />

                </TouchableOpacity >
              )
            }} />)}
        {loading && (
          <ActivityIndicator size={54} color={theme.primaryColorDark} style={styles.progressBar} />
        )}
      </View>
      <View style={{ ...styles.select, backgroundColor: theme.primaryColor }}>
        <FlatList
          horizontal
          data={emojis}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.emojiType} onPress={() => setEmojiSelect(item.type)}>
                <Image source={{ uri: item.emoji }} style={{ width: 20, height: 20 }} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>

  )
}
