import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import Gender from "react-native-vector-icons/Foundation";
import Mobile from "react-native-vector-icons/Entypo";
import Email from "react-native-vector-icons/MaterialCommunityIcons";
import Profession from "react-native-vector-icons/AntDesign";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { dataContext } from "../Contexts/dataContext";

function ProfileScreen(props) {
  const navigation = useNavigation();
  const { mobile, bspEmail, bspName } = useContext(dataContext);

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  // We used useFocuEffect so the hardwareBackPress event and the handleBackPress function is only called on the
  // HomeScreen. The Hook focuses the functionality to this Screen
  // I also removed the event to avoid a clash of events
  // The React.useCallback is used to avoid creating a stack of functions
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    })
  );

  return (
    <SafeAreaView style={[{ marginTop: 40, backgroundColor: "#fff" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Mobile name="menu" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="user-edit" size={24} color={"white"} />
            </TouchableOpacity>
            <Image
              width={100}
              height={60}
              resizeMode="contain"
              source={require("../assets/wave.png")}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image
              size={180}
              style={styles.avatar}
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC",
              }}
            />
          </View>

          <View style={{ marginTop: -50 }}>
            <Text style={styles.nameText}>{bspName}</Text>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 25 }}>
            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#ff9500" }]}
                >
                  <Email name="email" size={24} style={{ color: "white" }} />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Email</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {bspEmail}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#0d7313" }]}
                >
                  <Gender
                    name="torsos-male-female"
                    size={28}
                    color="blue"
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Gender</Text>
                  <Text style={styles.infoLarge_Text}>Male</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#774BBC" }]}
                >
                  <Profession
                    name="profile"
                    size={24}
                    style={{ color: "white" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Profession</Text>
                  <Text style={styles.infoLarge_Text}>Engineer</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#f2276e" }]}
                >
                  <Mobile name="mobile" size={24} style={{ color: "white" }} />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Mobile</Text>
                  <Text style={styles.infoLarge_Text}>{mobile}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  editIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    right: 2,
    margin: 15,
    marginTop: 20,
  },
  backIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    left: 2,
    margin: 15,
  },
  avatar: {
    borderRadius: 100,
    marginTop: -250,
    backgroundColor: "white",
    height: 200,
    width: 200,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: "black",
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "center",
  },
  infoCont: {
    width: "100%",
    flexDirection: "row",
  },
  infoIconCont: {
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    elevation: -5,
    borderColor: "black",
    backgroundColor: "black",
  },

  infoText: {
    width: "80%",
    flexDirection: "column",
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
  },
  infoSmall_Text: {
    fontSize: 13,
    color: "#b3b3b3",
    fontWeight: "500",
  },
  infoLarge_Text: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default ProfileScreen;
