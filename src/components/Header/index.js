import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { selectUser } from '../../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';
import IconFeather from 'react-native-vector-icons/Feather'

export default function Header() {
    const [image, setImage] = useState('');
    const { theme } = useContext(ThemeContext);

    const userRedux = useSelector(selectUser);
    let dispatch = useDispatch()
    let navigation = useNavigation();
    let route = useRoute()
    //const routeName = getFocusedRouteNameFromRoute(route) 
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
                    <IconFeather name="bell" size={25} style={{ marginRight: 10 }} />
                    <View style={{...styles.conter, opacity:0}}/>
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
        right:8
    },
    textConter:{
        color:'white',
        fontSize:9
    }
});