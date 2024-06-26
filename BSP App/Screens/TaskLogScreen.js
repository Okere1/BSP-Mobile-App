import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Mark from "react-native-vector-icons/AntDesign";
import Closequare from "react-native-vector-icons/AntDesign";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { dataContext } from "../Contexts/dataContext";

function TaskLogScreen(props) {
  const navigation = useNavigation();
  const { doneTaskList, pendingTaskList, suspendedTaskList } =
    useContext(dataContext);

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
        <View
          style={[
            {
              marginTop: 0,
              marginBottom: 200,
              backgroundColor: "#65A7F5",
              height: 1000,
            },
          ]}
        >
          <View style={{ marginTop: 10, marginHorizontal: 25 }}>
            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#D5F5E3",
                  padding: 5,
                },
              ]}
            >
              {doneTaskList.map((items, index) => {
                return (
                  <View style={styles.infoCont} key={index}>
                    <View
                      style={[
                        styles.infoIconCont,
                        { backgroundColor: "green" },
                      ]}
                    >
                      <Mark
                        name="checksquare"
                        size={24}
                        style={{ color: "white" }}
                      />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoSmall_Text}>Done Task</Text>
                      <Text style={styles.infoLarge_Text} numberOfLines={1}>
                        {items}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FEF9E7",
                  padding: 5,
                },
              ]}
            >
              {pendingTaskList.map((items, index) => {
                return (
                  <View style={styles.infoCont} key={index}>
                    <View
                      style={[
                        styles.infoIconCont,
                        { backgroundColor: "#AF601A" },
                      ]}
                    >
                      <Closequare
                        name="leftcircleo"
                        size={24}
                        style={{ color: "white" }}
                      />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoSmall_Text}>Pending Task</Text>
                      <Text style={styles.infoLarge_Text} numberOfLines={1}>
                        {items}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={[
                styles.infoMain,
                {
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  backgroundColor: "#FCF3CF",
                  padding: 5,
                },
              ]}
            >
              {suspendedTaskList.map((items, index) => {
                return (
                  <View style={styles.infoCont} key={index}>
                    <View
                      style={[styles.infoIconCont, { backgroundColor: "red" }]}
                    >
                      <Closequare
                        name="closesquare"
                        size={24}
                        style={{ color: "white" }}
                      />
                    </View>
                    <View style={styles.infoText}>
                      <Text style={styles.infoSmall_Text}>Suspended Task</Text>
                      <Text style={styles.infoLarge_Text} numberOfLines={1}>
                        {items}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* <Button title="GET NAME" onPress={() => getName()} /> */}
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
    margin: 20,
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
  bookCountMain: {
    borderColor: "#b0b0b0",
    borderWidth: 1,
    marginTop: 18,
    marginHorizontal: 20,

    borderRadius: 20,
    flexDirection: "row",
    width: "88%",
  },
  bookCount: {
    width: "50%",
    borderColor: "#b0b0b0",
    borderRightWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bookCountNum: {
    color: "#5D01AA",
    fontSize: 34,
    fontWeight: "800",
  },
  bookCountText: { color: "#b3b3b3", fontSize: 14, fontWeight: "500" },
  infoMain: {
    marginTop: 10,
    width: 385,
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
  booksUploadedMain: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    marginTop: 20,
  },
  flatlistDiv: {
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  booksUploadedText: {
    fontSize: 26,
    color: "black",
    fontWeight: "700",
    paddingLeft: 20,
    paddingBottom: 8,
  },
  booksUploadedCard: {
    flexDirection: "row",
    width: "100%",
    marginTop: 9,
    marginBottom: 9,

    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 3,
  },
  booksUploadedImgDiv: {
    width: "28%",
  },
  booksUploadedImg: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  cardMidDiv: {
    paddingHorizontal: 10,
    width: "55%",
    position: "relative",
  },
  approvedText: {
    fontSize: 12,
    color: "#0d7313",
    fontWeight: "600",
    marginLeft: 5,
  },
  cardBookNameText: {
    fontSize: 24,
    color: "black",
    fontWeight: "700",
    marginTop: 2,
  },
  cardBookAuthor: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
    marginTop: 1,
  },
  cardRating: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  cardRatingCount: {
    fontSize: 14,
    marginTop: -2,
    paddingLeft: 4,
    color: "#303030",
  },
  cardEditDiv: {
    width: "17%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardEditBtn: {
    height: 44,
    width: 44,
    backgroundColor: "#774BBC",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 10,
    justifyContent: "center",

    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#f5a002",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    paddingHorizontal: 20,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
});
export default TaskLogScreen;
