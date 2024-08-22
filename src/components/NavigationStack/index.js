import { createStackNavigator } from "@react-navigation/stack";
import Bambudo from "../../pages/Bambudo";
import SinglePost from "../../pages/SinglePost";
import Tabs from "../Navigation";
import NewPost from "../../pages/NewPost";


const Stack = createStackNavigator(); 


const NavigationStack = ({changeUserAuth}) => {
  return (
    <Stack.Navigator >  
       <Stack.Screen
        name="Tabs"
        lazy={true}
        component={(props) => <Tabs {...props} changeUserAuth={changeUserAuth} />}
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
    </Stack.Navigator>
  );
}

export {NavigationStack};
