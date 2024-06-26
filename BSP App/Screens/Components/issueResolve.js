import { Text, View, TextInput } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import styles from "../Styles/UserScreenStyle";
import pickerSelectStyles from "../Styles/RNStyle_LogData_box";
import Icon from "react-native-vector-icons/FontAwesome5";

function IssueResolve({
  issue,
  setIssue,
  otherIssue,
  setOtherIssue,
  issueArea,
  setIssueArea,
  onAddPress,
  onClearPress,
}) {
  const issueList = [
    { label: "None", value: "None" },
    { label: "Barrier arm issue", value: "Barrier arm issue" },
    { label: "Coder Issue", value: "Coder Issue" },
    { label: "Feeder issue", value: "Feeder issue" },
    { label: "Axle issue", value: "Axle issue" },
    { label: "Roll issue", value: "Roll issue" },
    { label: "Coder insertion error", value: "Coder insertion error" },
    { label: "Ticket jam", value: "Ticket jam" },
    { label: "Contact cashier", value: "Contact cashier" },
    { label: "Offline issue", value: "Offline issue" },
    { label: "Report generating issue", value: "Report generating issue" },
    { label: "RFID issue", value: "RFID issue" },
    {
      label: "No traffic light display issue",
      value: "No traffic light display issue",
    },
    { label: "Partial Thermal Print", value: "Partial Thermal Print" },
    { label: "Entrance offline issue", value: "Entrance offline issue" },
    { label: "Exit offline issue", value: "Exit offline issue" },
    {
      label: "Manual pay station offline issue",
      value: "Manual pay station offline issue",
    },
    { label: "Parking logic issue", value: "Parking logic issue" },
  ];
  return (
    <View>
      {/* ISSUE */}
      <View
        style={[
          styles.inputStyle,
          {
            // backgroundColor: "#634988",
            backgroundColor: "rgb(117, 117, 228)",
            marginTop: 5,
            paddingTop: 25,
            borderColor: "white",
            borderWidth: 1,
            height: 450,
            width: 360,
            borderRadius: 7,
          },
        ]}
      >
        <Text
          style={[
            {
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -15,
              textAlign: "center",
            },
          ]}
        >
          ISSUES/FAULTS
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Select Issue/Fault", value: null }}
          items={issueList}
          onValueChange={(value) => setIssue(value)}
          value={issue}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              // top: -2,
              right: 12,
            },
          }}
          Icon={() => {
            return <Icon name="sort-down" size={24} color="gray" />;
          }}
        />
        <TextInput
          style={[
            styles.inputStyle,
            {
              height: 55,
              marginTop: -100,
              marginBottom: 1,
              borderRadius: 0,
              borderColor: "gray",
              backgroundColor: "#FFFEFB",
              paddingLeft: 10,
            },
          ]}
          placeholder="Enter other faults here"
          value={otherIssue}
          onChangeText={setOtherIssue}
          placeholderTextColor="#c9d3d8"
        />

        <TouchableOpacity
          style={[styles.addButton, { marginBottom: 115, marginTop: -4 }]}
          onPress={onAddPress}
        >
          <Text>ADD</Text>
        </TouchableOpacity>
        <TextInput
          multiline
          numberOfLines={4}
          style={[
            styles.inputStyle,
            {
              borderRadius: 0,
              borderColor: "gray",
              backgroundColor: "#FFFEFB",
              height: 130,
              marginBottom: -25,
              marginTop: -160,
            },
          ]}
          value={issueArea}
          onChangeText={setIssueArea}
          editable={false}
          placeholderTextColor="#c9d3d8"
        />
        <TouchableOpacity
          style={[styles.addButton, { marginTop: -20, marginBottom: 10 }]}
          onPress={onClearPress}
        >
          <Text>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default IssueResolve;
