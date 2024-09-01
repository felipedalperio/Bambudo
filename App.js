import { StyleSheet, View, Text, StatusBar, ScrollView } from 'react-native'
import { useState, useEffect, useContext } from "react";
import Slide from "./src/pages/Slide";
import Create from "./src/pages/Create";
import Notification from "./src/pages/Notification";
import Login from "./src/pages/Login";
import store from "./src/store/store";
import Tabs from "./src/components/Navigation";
import firebase from './src/config/firebaseconfig';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch } from 'react-redux';
import 'react-native-gesture-handler';
import Loading from "./src/pages/Loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from './src/config/color';
import { ThemeContext, ThemeProvider } from './src/store/ThemeContext';
import { NavigationStack } from './src/components/NavigationStack';
import { LikedProvider } from './src/store/LikedContext';


const Stack = createStackNavigator();

export default function App() {
  const [userAuth, setUserAuth] = useState(null)


  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      getData();
    })
    const getData = async () => {
      await AsyncStorage.getItem('userId').then((value) => {
        if (value && value != "") {
          setUserAuth(true)
        } else {
          setUserAuth(false)
        }
      });
    };


  }, [])

  function changeUserAuth(value) {
    setUserAuth(value)
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LikedProvider>
          <StatusBar backgroundColor='black' />
          <NavigationContainer>
            {userAuth == null && (
              <Loading />
            )}
            {userAuth == true && (
              <NavigationStack changeUserAuth={changeUserAuth} />
            )}

            {userAuth == false &&
              (
                <Stack.Navigator initialRouteName="Slide">
                  <Stack.Screen
                    name="Slide"
                    component={Slide}
                    initialParams={{ changeUserAuth: changeUserAuth }}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="Create"
                    component={Create}
                    initialParams={{ changeUserAuth: changeUserAuth }}
                    options={{
                      headerShown: false
                    }}
                  />
                
                </Stack.Navigator>
              )
            }

          </NavigationContainer>
        </LikedProvider>
      </ThemeProvider>
    </Provider>
  );
}