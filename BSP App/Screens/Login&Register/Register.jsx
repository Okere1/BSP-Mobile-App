import * as Device from "expo-device";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../Styles/LoginStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Location from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Error from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import pickerSelectStyles from "../Styles/RNStyle_Register";

function RegisterPage() {
  [names, setNames] = useState("");
  [nameVerify, setNameVerify] = useState(false);
  [email, setEmail] = useState("");
  [emailVerify, setEmailVerify] = useState(false);
  [mobile, setMobile] = useState("");
  [mobileVerify, setMobileVerify] = useState(false);
  [password, setPassword] = useState("");
  [passwordVerify, setPasswordVerify] = useState(false);
  [showPassword, setShowPassword] = useState(true);
  [userRegCode, setUserRegCode] = useState("");
  [regCodeVerify, setRegCodeVerify] = useState(false);
  [serverRegCode, setServerRegCode] = useState("");
  [Id, setId] = useState("");
  [location, setLocation] = useState("");

  const navigation = useNavigation();

  function getPhoneId() {
    const deviceId = Device.osInternalBuildId;
    setId(deviceId);
  }

  function getServerRegCode() {
    const dataToSend = {
      email: email,
    };
    axios
      .post("https://bsp-node-backend.onrender.com/verifyRegId", dataToSend)
      .then((data) => {
        setServerRegCode(data.data.data.accessCode);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit() {
    const userData = {
      names: names,
      email,
      mobile,
      password,
      deviceId: Id,
      location: location,
    };

    if (
      nameVerify &&
      emailVerify &&
      passwordVerify &&
      mobileVerify &&
      regCodeVerify
    ) {
      axios
        .post("https://bsp-node-backend.onrender.com/register", userData)
        .then((res) => {
          if (res.data.status == "ok") {
            Alert.alert("Registered Successfull!!");
            navigation.navigate("Login");
          } else {
            Alert.alert(JSON.stringify(res.data.data));
          }
        })
        .catch((e) => console.log(e));
    } else if (serverRegCode !== userRegCode) {
      Alert.alert("Wrong Registration Code");
    } else {
      Alert.alert("Fill mandatory details");
    }
  }

  function handleRegCode(e) {
    const regVar = e.nativeEvent.text;
    setUserRegCode(regVar);
  }

  function regCodeCheck() {
    if (serverRegCode == userRegCode) {
      setRegCodeVerify(!regCodeVerify);
    } else if (serverRegCode != userRegCode) {
      setRegCodeVerify(false);
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setNames(nameVar);
    setNameVerify(false);
    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  function handleMobile(e) {
    getServerRegCode();
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[0-9]{1}[0-9]{10}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  useEffect(() => {
    // Call regCodeCheck whenever serverRegCode or userRegCode changes
    regCodeCheck();
  }, [serverRegCode, userRegCode]);

  useEffect(() => {
    getPhoneId();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../../assets/isw12.png")}
              />
            </View>
            <Text style={styles.text_header}>Register</Text>

            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#00425F"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                onChange={(e) => handleName(e)}
              />
              {names.length < 1 ? null : nameVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {names.length < 1 ? null : nameVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Name should be more than 1 character.
              </Text>
            )}

            <View style={styles.action}>
              <Fontisto
                name="email"
                color="#00425F"
                size={24}
                style={{ marginLeft: 0, paddingRight: 5 }}
              />
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChange={(e) => handleEmail(e)}
              />
              {email.length < 1 ? null : emailVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {email.length < 1 ? null : emailVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Enter Proper Email Address
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome
                name="mobile"
                color="#00425F"
                size={35}
                style={{ marginTop: -7, marginLeft: 5, paddingRight: 10 }}
              />
              <TextInput
                placeholder="Mobile"
                style={styles.textInput}
                onChange={(e) => handleMobile(e)}
                maxLength={11}
                keyboardType="numeric"
              />
              {mobile.length < 1 ? null : mobileVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Error name="error" color="red" size={20} />
              )}
            </View>
            {mobile.length < 1 ? null : mobileVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Enter Proper Phone Number
              </Text>
            )}

            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#00425F"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChange={(e) => handlePassword(e)}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {password.length < 1 ? null : !showPassword ? (
                  <Feather
                    name="eye"
                    color={passwordVerify ? "green" : "red"}
                    size={18}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    color={passwordVerify ? "green" : "red"}
                    size={18}
                  />
                )}
              </TouchableOpacity>
            </View>
            {password.length < 1 ? null : passwordVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: "red",
                }}
              >
                Enter Proper Phone Number
              </Text>
            )}

            <View style={[styles.action, { height: 50 }]}>
              <Location
                name="location"
                color="#00425F"
                style={styles.smallIcon}
              />
              <RNPickerSelect
                placeholder={{ label: "Select Location", value: null }}
                items={[
                  { label: "MMA2", value: "MMA2" },
                  { label: "MaryLand Mall", value: "MaryLand Mall" },
                ]}
                onValueChange={(value) => setLocation(value)}
                value={location}
                style={pickerSelectStyles}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome5
                name="key"
                color="#00425F"
                size={20}
                style={{ marginTop: -7, marginLeft: -3, paddingRight: 8 }}
              />
              <TextInput
                placeholder="Enter Registration Code"
                style={styles.textInput}
                value={userRegCode}
                onChange={(e) => handleRegCode(e)}
                maxLength={4}
                keyboardType="numeric"
                required
              />
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.inBut, { marginTop: 30 }]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textSign}>Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
