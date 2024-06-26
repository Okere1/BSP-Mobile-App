import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    marginLeft: -15,
  },
  inputAndroid: {
    fontSize: 15, // Adjust fontSize as needed
    paddingHorizontal: 10,
    paddingVertical: 1, // Reduce paddingVertical
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    color: "#94b8c7",
    width: 300,
    flex: 1,
    color: "#00425F",
    marginTop: -15,
  },
});

export default pickerSelectStyles;
