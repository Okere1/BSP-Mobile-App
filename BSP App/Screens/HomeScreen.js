import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Pending from "react-native-vector-icons/MaterialIcons";
import Done from "react-native-vector-icons/MaterialIcons";
import Suspended from "react-native-vector-icons/FontAwesome";
import { dataContext } from "../Contexts/dataContext";

const HomeScreen = () => {
  const {
    bspName,
    bspLocation,
    doneTaskCount,
    pendingTaskCount,
    suspendedTaskCount,
  } = useContext(dataContext);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={[{ marginTop: 40, backgroundColor: "#65A7F5" }]}>
      <View
        style={[
          {
            position: "relative",
            backgroundColor: "#65A7F5",
            height: 60,
          },
        ]}
      >
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              marginTop: 50,
              marginLeft: 15,
              marginRight: 15,
              flexDirection: "row",
              gap: 20,
              backgroundColor: "#7b4dd6",
              width: 385,
              paddingLeft: 23,
              paddingTop: 30,
              paddingBottom: 30,
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../assets/hero1.jpg")}
            />
            <Image
              style={styles.tinyLogo}
              source={require("../assets/hero2.jpg")}
            />
            <Image
              style={styles.tinyLogo}
              source={require("../assets/hero3.jpg")}
            />
          </View>
          <View style={styles.welcome}>
            <Text style={styles.welcome}>
              Welcome{" "}
              {bspName ? (
                bspName
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={[styles.nameText, { color: "#fff", fontSize: 23 }]}>
              Site:{" "}
              {bspLocation ? (
                bspLocation
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </Text>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 25 }}>
            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "#fff" }]}
                >
                  <Done
                    name="cloud-done"
                    size={24}
                    style={{ color: "green" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Resolved Task</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {doneTaskCount ? (
                      doneTaskCount
                    ) : (
                      <ActivityIndicator size="small" color="#fff" />
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "white" }]}
                >
                  <Pending
                    name="pending"
                    size={24}
                    style={{ color: "#bf955e" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Pending Task</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {pendingTaskCount ? (
                      pendingTaskCount
                    ) : (
                      <ActivityIndicator size="small" color="#fff" />
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoMain}>
              <View style={styles.infoCont}>
                <View
                  style={[styles.infoIconCont, { backgroundColor: "white" }]}
                >
                  <Suspended
                    name="hand-stop-o"
                    size={24}
                    style={{ color: "red" }}
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoSmall_Text}>Suspended Task</Text>
                  <Text style={styles.infoLarge_Text} numberOfLines={1}>
                    {suspendedTaskCount ? (
                      suspendedTaskCount
                    ) : (
                      <ActivityIndicator size="small" color="#fff" />
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="database"
                  color="white"
                  style={styles.smallIcon2}
                  onPress={() => {
                    navigation.navigate("Log Data");
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Log Data</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <FontAwesome
                  name="users"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Profile</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Task Log");
                }}
              >
                <FontAwesome
                  name="tasks"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Task Log</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Chat");
                }}
              >
                <FontAwesome
                  name="commenting-o"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Chat</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#65A7F5",
    height: 1000,
  },
  welcome: {
    color: "#fff",
    fontSize: 35,
    marginTop: 10,
    marginLeft: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  editIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    right: 2,
    margin: 20,
  },
  backIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    left: 2,
    margin: 15,
  },
  button: {
    alignItems: "center",
    marginTop: -20,
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inBut: {
    width: "70%",
    backgroundColor: "#00425F",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    // backgroundColor: "#00425F",
    backgroundColor: "#7b4dd6",
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 80,
  },
  smallIcon2: {
    fontSize: 40,
  },
  bottomText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  taskBox: {
    marginTop: 40,
    flexDirection: "row",
    gap: 10,
    paddingLeft: 15,
    height: 150,
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
    color: "#7b4dd6",
    fontWeight: "500",
  },
  infoLarge_Text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
