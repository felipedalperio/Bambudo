import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from './firebaseconfig'
import { useSelector, useDispatch } from 'react-redux';
import { changeUser, selectUser } from '../store/userSlice';
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function setUserCurrent() {
    let dispatch = useDispatch();
    const database = firebase.firestore();
    const navigation = useNavigation()

    async function setUser(id) {
        if (id == '') {
            await AsyncStorage.getItem('userId').then((userId) => {
                if (userId) {
                    database.collection('users').doc(userId).get().then((docRef) => {
                        dispatch(changeUser(
                            {
                                id: docRef.data().id,
                                email: docRef.data().email,
                                name: docRef.data().name,
                                picture: docRef.data().picture,
                                postsLiked: docRef.data().postsLiked,
                            }
                        ))
                    }).catch((error) => { //não conseguiu recuperar o usuario
                        Alert.alert('Oops algo deu errado')
                    })
                }
            }).catch((err) => {//não conseguiu recuperar o usuario
                Alert.alert('Oops algo deu errado')
            });
        }

    }
    return setUser;
}