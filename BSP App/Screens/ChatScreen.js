import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[{ marginTop: 40, backgroundColor: "#65A7F5" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 300,
            }}
          >
            <Text style={styles.text}>Coming Soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
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
});

export default ChatScreen;
