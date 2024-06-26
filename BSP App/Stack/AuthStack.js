import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../Screens/Login&Register/Login";
import RegisterPage from "../Screens/Login&Register/Register";
import DrawerNav from "../Drawer/DrawerNav";
// import AuthenticatedStack from "./AuthenticatedStack";

export default AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ drawerLabel: () => null, drawerLockMode: "locked-closed" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ drawerLabel: () => null, drawerLockMode: "locked-closed" }}
      />
      <Stack.Screen name="Home" component={DrawerNav} />
    </Stack.Navigator>
  );
};
