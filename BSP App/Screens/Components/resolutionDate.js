import { Text, View, TextInput, Pressable, Platform } from "react-native";
import React, { lazy, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../Styles/UserScreenStyle";

function ResolutionDate({ resolution, setResolution }) {
  const [mode, setMode] = useState("date");
  const [date2, setDate2] = useState(new Date());
  const [showPickerResolution, setShowPickerResolution] = useState(false);

  const toggleDatePickerResolution = () => {
    setShowPickerResolution(!showPickerResolution);
  };

  const onChangeResolutionDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate2(currentDate);
      if (Platform.OS === "android") {
        toggleDatePickerResolution();
        setResolution(currentDate.toDateString());
      }
    } else {
      toggleDatePickerResolution();
    }
  };

  const confirmIOSResolutionDate = () => {
    setResolution(date2.toDateString());
    toggleDatePickerResolution();
  };

  return (
    <View>
      {/* RESOLUTION DATE */}

      {showPickerResolution && (
        <DateTimePicker
          mode={mode}
          display="spinner"
          value={date2}
          onChange={onChangeResolutionDate}
          style={styles.datePicker}
        />
      )}

      {!showPickerResolution && (
        <Pressable onPress={toggleDatePickerResolution}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Resolution Date"
            value={resolution}
            onChangeText={setResolution}
            editable={false}
            onPressIn={toggleDatePickerResolution}
            placeholderTextColor="#c9d3d8"
          />
        </Pressable>
      )}

      {showPickerResolution && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {
                backgroundColor: "#11182711",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: "#075985",
                  backgroundColor: "orange",
                  padding: 5,
                  borderRadius: 5,
                },
                ,
              ]}
              onPress={toggleDatePickerResolution}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.pickerButton]}
            onPress={confirmIOSResolutionDate}
          >
            <Text
              style={[
                styles.buttonText,
                { backgroundColor: "orange", padding: 5, borderRadius: 5 },
              ]}
              onPress={toggleDatePickerResolution}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ResolutionDate;
