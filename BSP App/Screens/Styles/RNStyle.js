import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: -40,
    marginBottom: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    width: 350,
  },
  inputAndroid: {
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    color: "#94b8c7",
    backgroundColor: "#FFFEFB",
    width: 350,
    marginTop: -10,
    flex: 1,
    color: "#00425F",
    marginBottom: 90,
  },
});

export default pickerSelectStyles;
