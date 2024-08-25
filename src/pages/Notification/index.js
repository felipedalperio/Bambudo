import { View, Text, Image, FlatList, TouchableOpacity  } from 'react-native'
import styles from './style'
import { selectUser } from '../../store/userSlice';
import { ThemeContext } from '../../store/ThemeContext';
import { useContext, useEffect, useState, useCallback} from 'react';
import firebase from '../../config/firebaseconfig';
import { useSelector } from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation, useFocusEffect  } from '@react-navigation/native';

export default function Notification() {
  const userRedux = useSelector(selectUser);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  const notificationList = async () => {
    try {
      const userId = userRedux.id;
      const userDocRef = firebase.firestore().collection("notification").doc(userId);
      const doc = await userDocRef.get();

      if (doc.exists) {
        const notificationList = doc.data().notificationList;
        if (notificationList) {
          // Ordena a lista
          const sortedList = notificationList.sort((a, b) => {
            // Primeiro, ordena por fSeen (não vistas primeiro)
            if (a.fSeen === b.fSeen) {
              // Se fSeen for igual, ordena por date
              return new Date(b.date) - new Date(a.date);
            }
            return a.fSeen ? 1 : -1;
          });
          setList(sortedList);
        }
      }
    } catch (error) {
      console.error("Erro ao recuperar notificações: ", error);
    }
  };

  useEffect(() => {
    const getNotification = async () => {
      await notificationList();
    }
    getNotification();
  }, [userRedux]);

  const updateNotifications = useCallback(async () => {
    try {
      const userId = userRedux.id;
      const userDocRef = firebase.firestore().collection("notification").doc(userId);
      const doc = await userDocRef.get();

      if (doc.exists) {
        const notificationList = doc.data().notificationList;

        // Filtra notificações que ainda não foram vistas (fSeen: false)
        const notificationsToUpdate = notificationList.filter(notification => !notification.fSeen);

        if (notificationsToUpdate.length > 0) {
          // Atualiza apenas as notificações não vistas
          const updatedNotifications = notificationList.map(notification => {
            if (!notification.fSeen) {
              return { ...notification, fSeen: true };
            }
            return notification;
          });

          // Atualiza o documento com as notificações atualizadas e define newNotification como false
          await userDocRef.update({
            notificationList: updatedNotifications,
            newNotification: false
          });
        }
      }
    } catch (error) {
      Alert.alert('Erro ao atualizar notificações.');
    }
  }, [userRedux]);

  useFocusEffect(
    useCallback(() => {
      updateNotifications();
    }, [updateNotifications])
  );

  const formatDateToBR = (dateString) => {
    try{
      const [year, month, day] = dateString.split('-');
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }catch(err){
      return dateString
    }
  };

  const goSinglePost = async (idPost) => {
    try {
      const userDocRef = firebase.firestore().collection("posts").doc(idPost);
      const doc = await userDocRef.get();
      
      if (doc.exists) {
        const item = doc.data();
        if (item) {
          item.id = idPost
          navigation.navigate('SinglePost', { post: item, numberLikes: item.likes, lock: item.lock })
        } else {
          console.error("Documento não encontrado.");
        }
      } else {
        console.error("Documento não existe.");
      }
    } catch (error) {
      console.error("Erro ao obter documento: ", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={{...styles.titleGroup, backgroundColor:theme.primaryColor}}>
        <Text style={styles.textProfile}>Suas Notificações</Text>
        <IconFeather name='bell' size={20} color="white" style={{ marginLeft: 10 }} />
      </View>

      {list && list.length > 0 ? (
        <View style={styles.notificationWrapper}>
           <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity  style={{...styles.notificationItem, opacity: item.fSeen ? 0.7 : 1}} onPress={() => goSinglePost(item.idPost)}>
                  {
                    item.picture != "" ? (
                      <Image source={{ uri: item.picture }} style={styles.picture} />
                    ) : (
                      <Image source={require('../../storage/default.png')} style={styles.picture} />
                    )
                  }
                  <View style={{flexDirection:'row', flex:1}}>
                    <View style={{flexDirection:'column', flex:1}}>
                      <Text style={styles.message}>{item.message}</Text>
                      <View style={styles.dateWrapper}>
                      <View style={{ ...styles.circle, display: item.fSeen ? 'none' : 'flex' }}></View>
                        <Text style={{ ...styles.date, color: item.fSeen ? '#333' : '#ff5c33', fontWeight: item.fSeen ? '300' : '400' }}>
                          {formatDateToBR(item.date)}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                      <View style={{...styles.box, backgroundColor:theme.primaryColor}} >
                        {
                          item.type == 0 ? (
                            <IconFeather name='bell' size={14} color="white"/>
                          ) : (
                            <MaterialIcons name='chat-bubble-outline' size={14} color="white"/>
                          )
                        }
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      ) : (
        <Text style={styles.empty}>Você não possui nenhuma Notificação</Text>
      )}
    </View>
  )
}