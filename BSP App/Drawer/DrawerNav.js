// import AuthenticatedStack from "./AuthenticatedStack";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
// import AuthStack from "../Stack/AuthStack";
import TaskLogScreen from "../Screens/TaskLogScreen";
import LogDataScreen from "../Screens/LogDataScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import ChatScreen from "../Screens/ChatScreen";
import LoginPage from "../Screens/Login&Register/Login";
import HomeScreen from "../Screens/HomeScreen";
import RegisterPage from "../Screens/Login&Register/Register";

export default DrawerNav = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Drawer.Screen name="Home_1" component={AuthenticatedStack} /> */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Task Log" component={TaskLogScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Log Data" component={LogDataScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen
        name="Signup"
        component={LoginPage}
        options={{ drawerLabel: () => null, drawerLockMode: "locked-closed" }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterPage}
        options={{ drawerLabel: () => null, drawerLockMode: "locked-closed" }}
      />
    </Drawer.Navigator>
  );
};
