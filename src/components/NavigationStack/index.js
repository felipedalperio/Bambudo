import { createStackNavigator } from "@react-navigation/stack";
import Bambudo from "../../pages/Bambudo";
import SinglePost from "../../pages/SinglePost";
import Tabs from "../Navigation";
import NewPost from "../../pages/NewPost";
import Notification from "../../pages/Notification";


const Stack = createStackNavigator(); 


const NavigationStack = ({changeUserAuth}) => {
  const TabsScreen = (props) => <Tabs {...props} changeUserAuth={changeUserAuth} />;

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
        component={Notification}
      />
    </Stack.Navigator>
  );
}

export {NavigationStack};
