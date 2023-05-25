import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { selectUser } from '../../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'

export default function Header() {
    const [image, setImage] = useState('');
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

    const getName = () => {
        if(route.name == 'Bambudo'){
            return routeName
        }else{
            return route.name
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{route.name}</Text>
            <TouchableOpacity onPress={() => goSettings()}>
                <Image style={styles.image} source={image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent:"space-between",
        paddingHorizontal:10,
        flexDirection:'row',
        borderBottomColor:'#ddd',
        borderStyle:'solid',
        borderColor:'transparent',
        borderWidth:1,
    },
    icon:{
        width:30,
        height:30,
        marginRight:5
    },
    image:{
        width:40,
        height:40,
        resizeMode:'cover',
        borderRadius:30
    },
    texto: {
        color: '#515151',
        fontSize: 18,
    },
});