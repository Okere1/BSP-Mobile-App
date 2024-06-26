import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import LogDataScreen from "../Screens/LogDataScreen";
import Icon from "react-native-vector-icons/Entypo";
import AuthStack from "./AuthStack";
import ChatScreen from "../Screens/ChatScreen";
import LoginPage from "../Screens/Login&Register/Login";

export default AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        statusBarColor: "#0163d2",
        headerStyle: {
          backgroundColor: "#0163d2",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerShown: false,
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />

      <Stack.Screen
        name="LogData"
        component={LogDataScreen}
        options={{
          // headerShown: false,
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          // headerShown: false,
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    // We can do the styling in each screen or do it for all screen on the stack.nagivator, but the
    // the object to be used there is 'screenoptions' not 'options'
  );
};
