import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import styles from "../Styles/UserScreenStyle";
import pickerSelectStyles from "../Styles/RNStyle_LogData_box";
import Icon from "react-native-vector-icons/FontAwesome5";

function SparesUsed({
  spare,
  setSpare,
  otherSpares,
  setOtherSpares,
  spareArea,
  setSpareArea,
  onAddPress,
  onClearPress,
}) {
  const spareList = [
    { label: "None", value: "None" },
    { label: "Plastic screw M20", value: "Plastic screw M20" },
    {
      label: "Thermal printer head Coder Unlimited",
      value: "Thermal printer head Coder Unlimited",
    },
    { label: "Axle 3 complete green", value: "Axle 3 complete green" },
    { label: "Axle 4 complete", value: "Axle 4 complete" },
    { label: "Axle 5 complete blue", value: "Axle 5 complete blue" },
    { label: "Axle 6 complete blue", value: "Axle 6 complete blue" },
    { label: "Axle 8 complete blue", value: "Axle 8 complete blue" },
    {
      label: "Axle 9 complete blue Codeer unlimited",
      value: "Axle 9 complete blue Codeer unlimited",
    },
    { label: "Axle 8 complete blue", value: "Axle 8 complete blue" },
    { label: "front panel standard", value: "front panel standard" },
    { label: "SD 833 I/O modul 8/8", value: "SD 833 I/O modul 8/8" },
    { label: "SD 846", value: "SD 846" },
    {
      label: "SD 847Panelboard illuminated",
      value: "SD 847Panelboard illuminated",
    },
    { label: "SD 848", value: "SD 848" },
    {
      label: "Smart CPU Tamonten KIT Version2",
      value: "Smart CPU Tamonten KIT Version2",
    },
    { label: "Microswitch 1W/250V", value: "Microswitch 1W/250V" },
    { label: "2D multi barcode scanner", value: "2D multi barcode scanner" },
    {
      label: "Fitting for lighting button",
      value: "Fitting for lighting button",
    },
    {
      label: "Capazitive buttom - Voltage range 4,5-26,2V",
      value: "Capazitive buttom - Voltage range 4,5-26,2V",
    },
    {
      label: "Power.Gate / Lite.Gate / Barrier.Gate | Loop detector",
      value: "Power.Gate / Lite.Gate / Barrier.Gate | Loop detector",
    },
    { label: "Power supply 240W", value: "Power supply 240W" },
    {
      label: "W09/W09L/W28 buttoncable set",
      value: "W09/W09L/W28 buttoncable set",
    },
    {
      label: "W14 cable print@home illumination",
      value: "W14 cable print@home illumination",
    },
    {
      label: "W18 cable USB RFID - sd805",
      value: "W18 cable USB RFID - sd805",
    },
    { label: "W19 cable USB", value: "W19 cable USB" },
    { label: "W29 cable Power.Gate", value: "W29 cable Power.Gate" },
    {
      label: "Fitting for lighting button",
      value: "Fitting for lighting button",
    },
    {
      label: "SD 853 button lighting",
      value: "SD 853 button lighting",
    },
    {
      label: "SD 832 device controler V3.4",
      value: "SD 832 device controler V3.4",
    },
    {
      label: "Terminalbox incl. SD829",
      value: "Terminalbox incl. SD829",
    },
    {
      label: "Maintainancekit Barrier.Gate standard",
      value: "Maintainancekit Barrier.Gate standard",
    },
    {
      label: "Barrier.Gate power supply OEM 24 V",
      value: "Barrier.Gate power supply OEM 24 V",
    },
    {
      label: "laying bolt / Opresores",
      value: "laying bolt / Opresores",
    },
  ];
  return (
    <View>
      {/* SPARE USED */}
      <View
        style={[
          styles.inputStyle,
          {
            backgroundColor: "#6e8e71",
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
          SPARE USAGE
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Select Spare Used", value: null }}
          items={spareList}
          onValueChange={(value) => setSpare(value)}
          value={spare}
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
          value={otherSpares}
          onChangeText={setOtherSpares}
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
          value={spareArea}
          onChangeText={setSpareArea}
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

export default SparesUsed;
