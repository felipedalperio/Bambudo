import { createStackNavigator } from "@react-navigation/stack";
import Bambudo from "../../pages/Bambudo";
import SinglePost from "../../pages/SinglePost";
import Tabs from "../Navigation";
import NewPost from "../../pages/NewPost";
import Notification from "../../pages/Notification";
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';

const Stack = createStackNavigator(); 


const NavigationStack = ({changeUserAuth}) => {
  const TabsScreen = (props) => <Tabs {...props} changeUserAuth={changeUserAuth} />;
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator >  
       <Stack.Screen
        name="Tabs"
        lazy={true}
        component={TabsScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="SinglePost"
        lazy={true}
        options={{ title: 'Publicação', headerTitleAlign: 'center', headerStyle: {
          backgroundColor: theme.primaryColor
          },headerTitleStyle: {
            color: '#FFFFFF', // Cor do texto do título
          }, 
          headerTintColor: '#FFFFFF'
        }}
        component={SinglePost}
      />
       <Stack.Screen
        name="NewPost"
        lazy={true}
        options={{ headerShown: false }}
        component={NewPost}
      />
       <Stack.Screen
        name="Notification"
        lazy={true}
        options={{ title: 'Notificações', headerTitleAlign: 'center' }}
        component={Notification}
      />
    </Stack.Navigator>
  );
}

export {NavigationStack};
