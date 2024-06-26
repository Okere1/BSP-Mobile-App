import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import styles from "../Styles/UserScreenStyle";
import pickerSelectStyles from "../Styles/RNStyle_LogData_box";
import Icon from "react-native-vector-icons/FontAwesome5";

function ServicesRendered({
  services,
  setServices,
  otherServices,
  setOtherServices,
  serviceArea,
  setServiceArea,
  onAddPress,
  onClearPress,
}) {
  const serviceList = [
    { label: "None", value: "None" },
    { label: "DAU Server Restart", value: "DAU Server Restart" },
    {
      label: "System Maintenance (Cleanup)",
      value: "System Maintenance (Cleanup)",
    },
    {
      label:
        "Requires Replacement Of Cross-Wise Barcode Scanner And Device Re-Configuration",
      value:
        "Requires Replacement Of Cross-Wise Barcode Scanner And Device Re-Configuration",
    },
    {
      label:
        "Requires Replacement of Damaged Axle 5 And 6 And Device Re-Configuration",
      value:
        "Requires Replacement of Damaged Axle 5 And 6 And Device Re-Configuration",
    },
    {
      label:
        "Requires Replacement of Thermal Head Print and Device Re-Configuration",
      value:
        "Requires Replacement of Thermal Head Print and Device Re-Configuration",
    },
    {
      label:
        "Requires Replacement of Cross-Wise Barcode Scanner and Device Re-Configuration",
      value:
        "Requires Replacement of Cross-Wise Barcode Scanner and Device Re-Configuration",
    },
    {
      label:
        "Requires Replacement of Damaged Axle 2 And Device Re-Configuration",
      value:
        "Requires Replacement of Damaged Axle 2 And Device Re-Configuration",
    },
    {
      label: "Replacement Of the Damaged Part",
      value: "Replacement Of the Damaged Part",
    },
    {
      label: "Replacement Of Damaged Plastic Screw",
      value: "Replacement Of Damaged Plastic Screw",
    },
    { label: "Device Replacement", value: "Device Replacement" },
    {
      label:
        "Requires Replacement of Thermal Head Print and Device Re-Configuration",
      value:
        "Requires Replacement of Thermal Head Print and Device Re-Configuration",
    },
    { label: "Reboot System", value: "Reboot System" },
    {
      label: "Entry 3 Coder Not Reading Printing Ticket	Ongoing Repair",
      value: "Entry 3 Coder Not Reading Printing Ticket	Ongoing Repair",
    },
    {
      label: "Hard Restart of Network Converter",
      value: "Hard Restart of Network Converter",
    },
    {
      label: "Requires Servicing of Cross-Wise Barcode Scanner",
      value: "Requires Servicing of Cross-Wise Barcode Scanner",
    },
    {
      label: "Repair A Broken Rj45 Connector in The Transmission Room",
      value: "Repair A Broken Rj45 Connector in The Transmission Room",
    },
    { label: "Re-Start Network Switch", value: "Re-Start Network Switch" },
    { label: "Contact OEM For Support", value: "Contact OEM For Support" },
    {
      label:
        "Requires Servicing of Coder Unit Components and Device Re-Configuration",
      value:
        "Requires Servicing of Coder Unit Components and Device Re-Configuration",
    },
    {
      label: "Reconfiguration Of the Display from The System",
      value: "Reconfiguration Of the Display from The System",
    },
    {
      label:
        "Requires Replacement of Cross-Wise Barcode Scanner And Device Re-Configuration",
      value:
        "Requires Replacement of Cross-Wise Barcode Scanner And Device Re-Configuration",
    },
    {
      label: "Requires Replacement of Feeder Unit Ticket Sensor and Prisms",
      value: "Requires Replacement of Feeder Unit Ticket Sensor and Prisms",
    },
    {
      label: "Requires Replacement of Prisms and Device Reconfiguration",
      value: "Requires Replacement of Prisms and Device Reconfiguration",
    },
  ];
  return (
    <View>
      {/* SERVICE RENDERED */}
      <View
        style={[
          styles.inputStyle,
          {
            backgroundColor: "#9cc4e5",
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
          SERVICES
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Select Service Rendered", value: null }}
          items={serviceList}
          onValueChange={(value) => setServices(value)}
          value={services}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              // top: -6,
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
          value={otherServices}
          onChangeText={setOtherServices}
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
          value={serviceArea}
          onChangeText={setServiceArea}
          editable={false}
          placeholderTextColor="#c9d3d8"
        />
        <TouchableOpacity
          style={[styles.addButton, { marginTop: -20, marginBottom: 13 }]}
          onPress={onClearPress}
        >
          <Text>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ServicesRendered;
