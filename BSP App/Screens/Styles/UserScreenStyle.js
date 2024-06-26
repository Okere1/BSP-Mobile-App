import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 0,
    paddingTop: 10,
  },
  input: {
    height: 50,
    width: 200,
    borderColor: "#94b8c7",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputStyle: {
    height: 60,
    width: 350,
    borderColor: "#94b8c7",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 5,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButton: {
    borderRadius: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFB",
    height: 50,
  },
  sendButton: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 70,
    marginLeft: -27,
    width: 410,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e8e71",
    height: 50,
  },
  editIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    right: 2,
    margin: 20,
  },
  backIcon: {
    zIndex: 1,
    color: "white",
    position: "absolute",
    left: 2,
    margin: 15,
  },
});

export default styles;
