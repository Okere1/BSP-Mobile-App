import Root from "./Stack/Root";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataContext } from "./Contexts/dataContext";
import Navigation from "./Stack/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [bspName, setBspName] = useState("");
  const [bspEmail, setBspEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [phoneId, setPhoneId] = useState("");
  const [bspLocation, setBspLocation] = useState("");
  const [doneTaskCount, setDoneTaskCount] = useState("");
  const [doneTaskList, setDoneTaskList] = useState("");
  const [pendingTaskCount, setPendingTaskCount] = useState("");
  const [pendingTaskList, setPendingTaskList] = useState("");
  const [suspendedTaskCount, setSuspendedTaskCount] = useState("");
  const [suspendedTaskList, setSuspendedTaskList] = useState("");

  async function getFormData() {
    // CODE TO FETCH FROM SHEET DATA

    // console.log("GET FORM DATA FUNCTION HAS BEEN CALLED");
    const sheetUrl =
      "https://script.google.com/macros/s/AKfycbyhmFsnyRHvoEelqgtZDM6SVvZMIxWdvhWYJumosd5jDqj-W7p3m4SNOvBUZW6JNwSHiA/exec";

    try {
      axios
        .get(sheetUrl)
        .then((res) => {
          // FILTER OUT DONE ISSUES
          const filteredDoneIssuesFault = res.data.filter(
            (item) => item.Technician === bspName && item.Status === "Done"
          );
          // GET DONE ISSUE COUNT
          setDoneTaskCount(filteredDoneIssuesFault.length);
          // GET DONE ISSUE LIST
          const doneIssuesFault = filteredDoneIssuesFault.map(
            (item) => item.Issues_Fault
          );
          setDoneTaskList(doneIssuesFault);

          // FILTER OUT PENDING ISSUES
          const filteredPendingIssuesFault = res.data.filter(
            (item) => item.Technician === bspName && item.Status === "Pending"
          );
          // GET PENDING ISSUE COUNT
          setPendingTaskCount(filteredPendingIssuesFault.length);

          // GET PENDING ISSUE LIST
          const pendingIssuesFault = filteredPendingIssuesFault.map(
            (item) => item.Issues_Fault
          );
          setPendingTaskList(pendingIssuesFault);

          // FILTER OUT SUSPENDED ISSUE
          const filteredSuspendedIssuesFault = res.data.filter(
            (item) => item.Technician === bspName && item.Status === "Suspended"
          );
          // GET SUSPENDED ISSUE COUNT
          setSuspendedTaskCount(filteredSuspendedIssuesFault.length);

          // GET SUSPENDED ISSUE LIST
          const suspendedIssuesFault = filteredSuspendedIssuesFault.map(
            (item) => item.Issues_Fault
          );
          setSuspendedTaskList(suspendedIssuesFault);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error from getFormData", error);
    }
  }

  async function getData() {
    await getFormData();
    const getToken = await AsyncStorage.getItem("token");
    const getmail = await AsyncStorage.getItem("getEmail");
    // console.log(getToken);
    setToken(getToken);
    setBspEmail(getmail);
    axios
      .post("https://bsp-node-backend.onrender.com/userdata", {
        token: getToken,
      })
      .then((res) => {
        setBspName(res.data.data.names);
        setBspLocation(res.data.data.location);
        // console.log('SITE LOCATION IS:', bspLocation);
        setMobile(res.data.data.mobile);
      })
      .catch((error) => console.log(error));

    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, [isLoggedIn, bspName, bspEmail, token, mobile, phoneId, bspLocation]);

  return (
    <dataContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        bspName,
        setBspName,
        setBspEmail,
        bspEmail,
        setMobile,
        mobile,
        phoneId,
        setPhoneId,
        bspLocation,
        setBspLocation,
        setDoneTaskCount,
        doneTaskCount,
        setDoneTaskList,
        doneTaskList,
        setPendingTaskCount,
        pendingTaskCount,
        setPendingTaskList,
        pendingTaskList,
        setSuspendedTaskCount,
        suspendedTaskCount,
        setSuspendedTaskList,
        suspendedTaskList,
      }}
    >
      <Root />
    </dataContext.Provider>
  );
}
