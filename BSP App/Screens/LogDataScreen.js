import {
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import styles from "./Styles/UserScreenStyle";
import IssueResolve from "./Components/issueResolve";
import ServicesRendered from "./Components/servicesRendered";
import SparesUsed from "./Components/sparesUsed";
import EntryDate from "./Components/entryDate";
import ResolutionDate from "./Components/resolutionDate";
import { updateIssueArea } from "./Components/issueAdd";
import { updateServiceArea } from "./Components/serviceAdd";
import { updateSpareArea } from "./Components/spareAdd";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pickerSelectStyles from "../Screens/Styles/RNStyle_LogData";
import Mobile from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { dataContext } from "../Contexts/dataContext";

import * as Location from "expo-location";
// import geolib from "geolib";
import * as geolib from "geolib";

// Interswitch Geofence
const geofenceCoordinates = [
  { latitude: 6.431055642170026, longitude: 3.424094567494632 },
  { latitude: 6.425607676884849, longitude: 3.4240301944775027 },
  { latitude: 6.425810244153338, longitude: 3.4304245808456804 },
  { latitude: 6.431140932747581, longitude: 3.4304889538628096 },
];

// MMA2 GEOFENCE CORDINATES
const MMA2 = [
  { latitude: 6.431055642170026, longitude: 3.424094567494632 },
  { latitude: 6.425607676884849, longitude: 3.4240301944775027 },
  { latitude: 6.425810244153338, longitude: 3.4304245808456804 },
  { latitude: 6.431140932747581, longitude: 3.4304889538628096 },
];

// MARRYLAND GEOFENCE CORDINATES
const MarryLand = [
  { latitude: 6.431055642170026, longitude: 3.424094567494632 },
  { latitude: 6.425607676884849, longitude: 3.4240301944775027 },
  { latitude: 6.425810244153338, longitude: 3.4304245808456804 },
  { latitude: 6.431140932747581, longitude: 3.4304889538628096 },
];

const geofences = { MMA2, MarryLand };

// RANDOM GEOFENCE CORDINATES
// const geofenceCoordinates = [
//   { lat: 9.431055642170026, lng: 7.424094567494632 },
//   { lat: 9.425607676884849, lng: 7.4240301944775027 },
//   { lat: 9.425810244153338, lng: 7.4304245808456804 },
//   { lat: 9.431140932747581, lng: 7.4304889538628096 },
// ];

function LogDataScreen() {
  const navigation = useNavigation();
  const { bspName, bspLocation } = useContext(dataContext);
  const [bspSiteLocation, setBspSiteLocation] = useState("");

  // State to hold the text entered in the TextInput
  const [name, setName] = useState(null);
  const [customer, setCustomer] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [geolocation, setGeolocation] = useState(null);
  const [intendedGeolocation, setIntendedGeolocation] = useState(null);

  const [issue, setIssue] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [issueArea, setIssueArea] = useState("");

  function handleIssueAddPress() {
    updateIssueArea(
      issue,
      setIssue,
      otherIssue,
      setOtherIssue,
      issueArea,
      setIssueArea
    );
  }

  function handleIssueClearPress() {
    setIssueArea("");
  }

  const [services, setServices] = useState("");
  const [otherServices, setOtherServices] = useState("");
  const [serviceArea, setServiceArea] = useState("");

  function handleServiceAddPress() {
    updateServiceArea(
      services,
      setServices,
      otherServices,
      setOtherServices,
      serviceArea,
      setServiceArea
    );
  }

  function handleServiceClearPress() {
    setServiceArea("");
  }

  const [spare, setSpare] = useState("");
  const [otherSpares, setOtherSpares] = useState("");
  const [spareArea, setSpareArea] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [resolution, setResolution] = useState("");

  function handleSpareAddPress() {
    updateSpareArea(
      spare,
      setSpare,
      otherSpares,
      setOtherSpares,
      spareArea,
      setSpareArea
    );
  }

  function handleSpareClearPress() {
    setSpareArea("");
  }

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please enable location services to continue."
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setGeolocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  function clearData() {
    setName("");
    setCustomer("");
    setLocation("");
    setStatus("");
    setIssueArea("");
    setServiceArea("");
    setSpareArea("");
    setEntryDate("");
    setResolution("");
  }

  const checkUserLocation = async () => {
    if (geolocation) {
      const currentGeofence = geofences[bspLocation];

      const isInsideGeofence = geolib.isPointInPolygon(
        geolocation,
        currentGeofence
      );
      if (isInsideGeofence) {
        sendData();
        Alert.alert("Log Successfully Sent");
        clearData();
      } else {
        Alert.alert(
          "Warning",
          "You are not in your designated station, Your log will not be submitted."
        );
      }
    } else {
      Alert.alert(
        "Warning",
        "Could not get your location. Please try again later."
      );
    }
  };

  function sendData() {
    const sheetUrl =
      "https://script.google.com/macros/s/AKfycbyhmFsnyRHvoEelqgtZDM6SVvZMIxWdvhWYJumosd5jDqj-W7p3m4SNOvBUZW6JNwSHiA/exec";

    const data = {
      Technician: bspName,
      Customer: customer,
      Location: location,
      Issues_Fault: issueArea,
      Service_Required: serviceArea,
      Spares_Used: spareArea,
      Date_On_Site: entryDate,
      Resolution_Date: resolution,
      Status: status,
    };

    axios.post(sheetUrl, data);
  }

  useEffect(() => {
    getLocationAsync();
    setBspSiteLocation(bspLocation);
  }, []);

  return (
    <SafeAreaView>
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
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginLeft: 30, marginTop: 20 }}>
            <View
              style={[styles.inputStyle, { paddingTop: 20, paddingLeft: 15 }]}
            >
              <TextInput
                value={bspName}
                placeholderTextColor="#c9d3d8"
                style={[{ fontSize: 16 }]}
              />
            </View>

            <View style={[styles.inputStyle, { marginTop: 5 }]}>
              <RNPickerSelect
                placeholder={{ label: "Select Customer", value: null }}
                items={[
                  { label: "MMA2", value: "MMA2" },
                  { label: "Maryland Mall", value: "Maryland Mall" },
                  { label: "AMML", value: "AMML" },
                ]}
                onValueChange={(value) => setCustomer(value)}
                value={customer}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                Icon={() => {
                  return <Icon name="sort-down" size={24} color="gray" />;
                }}
              />
            </View>

            <View style={[styles.inputStyle, { marginTop: 5 }]}>
              <RNPickerSelect
                placeholder={{ label: "Select Location", value: null }}
                items={[
                  { label: "Lagos", value: "Lagos" },
                  { label: "Abuja", value: "Abuja" },
                ]}
                onValueChange={(value) => {
                  setLocation(value);
                  console.log("BSP LOCATION ON LOG PAGE IS", bspSiteLocation);
                }}
                value={location}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                Icon={() => {
                  return <Icon name="sort-down" size={24} color="gray" />;
                }}
              />
            </View>
            <IssueResolve
              issue={issue}
              setIssue={setIssue}
              otherIssue={otherIssue}
              setOtherIssue={setOtherIssue}
              issueArea={issueArea}
              setIssueArea={setIssueArea}
              onAddPress={handleIssueAddPress}
              onClearPress={handleIssueClearPress}
            />
            <ServicesRendered
              services={services}
              setServices={setServices}
              otherServices={otherServices}
              setOtherServices={setOtherServices}
              serviceArea={serviceArea}
              setServiceArea={setServiceArea}
              onAddPress={handleServiceAddPress}
              onClearPress={handleServiceClearPress}
            />
            <SparesUsed
              spare={spare}
              setSpare={setSpare}
              otherSpares={otherSpares}
              setOtherSpares={setOtherSpares}
              spareArea={spareArea}
              setSpareArea={setSpareArea}
              onAddPress={handleSpareAddPress}
              onClearPress={handleSpareClearPress}
            />

            <View style={styles.inputStyle}>
              <RNPickerSelect
                placeholder={{ label: "Select Task Status", value: null }}
                items={[
                  { label: "Done", value: "Done" },
                  { label: "Pending", value: "Pending" },
                  { label: "Suspended", value: "Suspended" },
                ]}
                onValueChange={(value) => setStatus(value)}
                value={status}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                Icon={() => {
                  return <Icon name="sort-down" size={24} color="gray" />;
                }}
              />
            </View>
            <EntryDate entryDate={entryDate} setEntryDate={setEntryDate} />
            <ResolutionDate
              resolution={resolution}
              setResolution={setResolution}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => checkUserLocation()}
            >
              <Text>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LogDataScreen;
