import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    SafeAreaView,
    ActivityIndicator
} from 'react-native'
import { useContext, useEffect, useState } from 'react';
import styles from './style';
import { vw } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../config/firebaseconfig';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../config/color';
import { ThemeContext } from '../../store/ThemeContext';
import { selectUser } from '../../store/userSlice';
import { setUserCurrent } from '../../config/setUserCurrent';


export default function Create() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorRegister, setErrorRegister] = useState(false);
    let dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { theme } = useContext(ThemeContext);
    const setUser = setUserCurrent();
    const userRedux = useSelector(selectUser);

    const Login = () => {
        navigation.goBack()
    }

    useEffect(() => {
        if (errorRegister) {
            setLoading(false)
        }
    }, [errorRegister])

    useEffect(() => {
        setUser(userRedux.id);
    }, [])

    function newUser(user) {
        firebase.firestore().collection('users').doc(user.uid).set({
            id: user.uid,
            name: username,
            email: email,
            picture: '',
            postsLiked: [],
            myPosts: []
        });
    }

    const registerFirebase = async () => {
        setLoading(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                newUser(user);
                AsyncStorage.setItem('userId', user.uid).then(() => {
                    setLoading(false)
                    route.params.changeUserAuth(true)
                })
                .catch((error) => {
                    Alert('Ops, Algo deu errado.')
                    route.params.changeUserAuth(false)
                    setLoading(false)
                });
            }).catch((error) => {
                setLoading(false)
                setErrorRegister(true);
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }

    const MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ ...styles.container, width: vw(100), backgroundColor:theme.primaryColor}}>
            <MyStatusBar backgroundColor={theme.primaryColorDark} barStyle="light-content" />
            <View style={styles.wrapper} keyboardShouldPersistTaps="always">
                <Image style={styles.iconCreate} source={require('../../storage/pandaa.png')} />
                <View style={styles.groupTitle}>
                    <Text style={{ ...styles.titleCreate, color: 'black' }}>Bam</Text>
                    <Text style={styles.titleCreate}>Budo</Text>
                </View>
                <TextInput onChangeText={(text) => setUsername(text)} value={username} style={styles.input} placeholder='Username' placeholderTextColor={theme.primaryColorDark} type="text" maxLength={20} />
                <TextInput onChangeText={(text) => setEmail(text)} value={email} style={styles.input} placeholder='Email' placeholderTextColor={theme.primaryColorDark} type="text"  maxLength={40}/>
                <TextInput onChangeText={(text) => setPassword(text)} value={password} style={styles.input} placeholder='Senha' placeholderTextColor={theme.primaryColorDark} secureTextEntry={true} type="text" maxLength={40} />

                {errorRegister === true
                    ? (
                        <View style={styles.contentAlert}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color="#222" />
                            <Text style={styles.warningAlert}>Senha ou Email invalido.</Text>
                        </View>
                    ) : (
                        <View />
                    )
                }

                <TouchableOpacity style={styles.buttonCreate} onPress={registerFirebase}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.textCreate}>ENTRAR</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.registerText}>Já possui uma conta? <Text onPress={() => Login()} style={styles.registerTextA}> Logar-se</Text></Text>
            </View>
        </KeyboardAvoidingView>
    )
}