import * as Device from "expo-device";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../Styles/LoginStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataContext } from "../../Contexts/dataContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Id, setId] = useState("");
  const navigation = useNavigation();
  const { setPhoneId } = useContext(dataContext);

  function getPhoneId() {
    if (Device) {
      const deviceId = Device.osInternalBuildId;
      setId(deviceId);
      setPhoneId(deviceId);
    } else {
      console.log("Device object not defined");
    }
  }
  function handleSubmit() {
    const userData = {
      email: email,
      password,
      deviceId: Id,
    };

    axios
      .post("https://bsp-node-backend.onrender.com/login-user", userData)
      .then((res) => {
        if (res.data.status == "ok") {
          Alert.alert("Login Successful");
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("getEmail", email);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          navigation.navigate("Home");
        } else {
          Alert.alert(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPhoneId();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/isw12.png")}
          />
        </View>
        <Text style={styles.text_header}>Login</Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#00425F" style={styles.smallIcon} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="lock" color="#00425F" style={styles.smallIcon} />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            secureTextEntry={true}
          />
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 8,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#00425F", fontWeight: "700" }}>
            Forgot Password
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
          <Text style={styles.textSign}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#919191",
            marginLeft: 110,
            marginTop: 70,
          }}
        >
          ----Or Continue as----
        </Text>
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
              name="user-circle-o"
              color="white"
              style={styles.smallIcon2}
              onPress={() => alert("Coming Soon")}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Guest</Text>
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
              navigation.navigate("Register");
            }}
          >
            <FontAwesome
              name="user-plus"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Sign Up</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.inBut2}
            onPress={() => alert("Coming Soon")}
          >
            <FontAwesome
              name="google"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Google</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.inBut2}
            onPress={() => alert("Coming Soon")}
          >
            <FontAwesome
              name="facebook-f"
              color="white"
              style={[styles.smallIcon2, { fontSize: 30 }]}
            />
          </TouchableOpacity>
          <Text style={styles.bottomText}>Facebook</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginPage;
