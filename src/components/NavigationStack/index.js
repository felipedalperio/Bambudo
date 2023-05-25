import { createStackNavigator } from "@react-navigation/stack";
import Bambudo from "../../pages/Bambudo";
import SinglePost from "../../pages/SinglePost";


const Stack = createStackNavigator(); 


const NavigationStack = () => {
  return (
    <Stack.Navigator >  
       <Stack.Screen
        name="Bambudo"
        lazy={true}
        component={Bambudo}
        options = {{headerShown: false}}
      />
       <Stack.Screen
        name="SinglePost"
        lazy={true}
        
        component={SinglePost}
      />
    </Stack.Navigator>
  );
}

export {NavigationStack};
