import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../Login&Register/Login";
import RegisterPage from "../Login&Register/Register";
import DrawerNav from "./DrawerNav";

export default AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home_1" component={DrawerNav} />
    </Stack.Navigator>
  );
};
