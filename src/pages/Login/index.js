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
    ActivityIndicator,
    Alert,
} from 'react-native'
import styles from './style';
import { vw } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import { changeUser } from '../../store/userSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import firebase from '../../config/firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { color } from '../../config/color';
import { ThemeContext } from '../../store/ThemeContext';

export default function Login({ props, setIndex }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { theme } = useContext(ThemeContext);


    const loginFirebase = async () => {
        setLoading(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                AsyncStorage.setItem('userId', user.uid).then(() => {
                    setLoading(false)
                    route.params.changeUserAuth(true)
                  })
                  .catch((error) => {
                    Alert('Ops, Algo deu errado.')
                    route.params.changeUserAuth(false)
                    setLoading(false)
                  });
            })
            .catch((error) => {
                setErrorLogin(true);
                let errorCode = error.code;
                let errorMessage = error.message;
                setLoading(false)
            });

    }

    const backPosition = () => {
        setIndex(props.id - 1);
    }

    const GoRegister = () => {
        navigation.navigate('Create');
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
            style={{ ...styles.container, width: vw(100), backgroundColor:theme.primaryColor }}>
            <MyStatusBar backgroundColor={theme.primaryColorDark} barStyle="light-content" />
            <View style={styles.wrapper} keyboardShouldPersistTaps="always">
                <Image style={styles.iconLogin} source={props.icon} />
                <View style={styles.groupTitle}>
                    <Text style={{ ...styles.titleLogin, color: 'black' }}>Bam</Text>
                    <Text style={styles.titleLogin}>Budo</Text>
                </View>
                <TextInput onChangeText={(text) => setEmail(text)} value={email} style={styles.input} placeholder='Email' placeholderTextColor={theme.primaryColorDark} type="text" />
                <TextInput onChangeText={(text) => setPassword(text)} value={password} style={styles.input} placeholder='Senha' placeholderTextColor={theme.primaryColorDark} secureTextEntry={true} type="text" />

                {errorLogin === true
                    ? (
                        <View style={styles.contentAlert}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color="#222" />
                            <Text style={styles.warningAlert}>Senha ou Email invalido.</Text>
                        </View>
                    ) : (
                        <View />
                    )
                }


                <TouchableOpacity style={styles.buttonLogin} onPress={loginFirebase}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.textLogin}>ENTRAR</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.registerText} onPress={() => GoRegister()}>Não possui uma contra? <Text style={styles.registerTextA}> Registre-se</Text></Text>
                <View style={styles.groupBall}>
                    <View style={{ ...styles.ball, backgroundColor: props.ball[0] }}></View>
                    <View style={{ ...styles.ball, backgroundColor: props.ball[1] }}></View>
                    <View style={{ ...styles.ball, backgroundColor: props.ball[2] }}></View>
                    <View style={{ ...styles.ball, backgroundColor: props.ball[3] }}></View>
                </View>
                <TouchableOpacity style={styles.next} onPress={backPosition}>
                    <Text style={{...styles.textNext, color: theme.primaryColor,}}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}