import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import DrawerNav from "../Drawer/DrawerNav";
import { dataContext } from "../Contexts/dataContext";

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  const { isLoggedIn } = useContext(dataContext);
  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <AuthStack />}
    </NavigationContainer>
  );
}
