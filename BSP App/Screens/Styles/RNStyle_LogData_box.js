import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: -20,
    marginBottom: 55,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    width: 350,
    height: 54,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
    width: 350,
    marginTop: -10,
    marginBottom: 59,
    paddingRight: 30, // Ensure the text is not behind the icon
  },
  placeholder: {
    color: "gray",
    fontSize: 16,
  },
});

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 15,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//     color: "black",
//     paddingRight: 30,
//     backgroundColor: "white",
//     width: 300,
//   },
//   inputAndroid: {
//     fontSize: 15,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//     color: "black",
//     paddingRight: 30,
//     backgroundColor: "white",
//     width: 300,
//   },
//   placeholder: {
//     color: "gray",
//   },
// });

export default pickerSelectStyles;
