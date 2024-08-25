import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  useNavigation, useRoute } from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather'
import firebase from '../../config/firebaseconfig';

export default function Header() {
    const [image, setImage] = useState('');
    const userRedux = useSelector(selectUser);
    let navigation = useNavigation();
    let route = useRoute()
    //const routeName = getFocusedRouteNameFromRoute(route) 
    const [newNotification, setNewNotification] = useState(false);

    useEffect(() => {
        const userId = userRedux.id;
        if(userId){
            const database = firebase.firestore();
            if(database){
                const userDocRef = database.collection("notification").doc(userId);
                // Listener para o campo newNotification em tempo real
                const unsubscribe = userDocRef.onSnapshot((doc) => {
                if (doc.exists) {
                    setNewNotification(doc.data().newNotification);
                }
                });
                // Limpeza do listener quando o componente for desmontado
                return () => unsubscribe();
            }
        }
    }, [userRedux]);

    useEffect(() => {
        imagePicture()
    }, [userRedux])

    const imagePicture = () => {
        if (userRedux.picture != '') {
            setImage({ uri: userRedux.picture });
        } else {
            setImage(require('../../storage/default.png'))
        }
    }

    const goSettings = () => {
        navigation.navigate('Settings')
    }
    const goNotification = () => {
        navigation.navigate('Notification')
    }

    const getName = () => {
        if (route.name == 'Bambudo') {
            return routeName
        } else {
            return route.name
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{route.name}</Text>

            <View style={styles.right}>
                <TouchableOpacity onPress={() => goNotification()} style={{marginRight:20}}>
                    <IconFeather name="bell" size={25}  />
                    <View style={{...styles.conter, opacity: newNotification ? 1 : 0}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goSettings()}>
                    <Image style={styles.image} source={image} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 30
    },
    texto: {
        color: '#515151',
        fontSize: 18,
    },

    right:{
        alignItems:'center',
        flexDirection:'row',
        position:'relative',
    },

    conter:{
        height:12,
        width:12,
        borderRadius: 10,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ff5c33',
        bottom:2,
        left:16
    },
    textConter:{
        color:'white',
        fontSize:9
    }
});