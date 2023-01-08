import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import MechanicGetAPI from "../core/api/MechanicGetAPI";
import MechanicOrder from "../core/api/MechanicOrder";
import { theme } from "../core/theme";

const CostCalculate = ({ navigation }) => {
  const [status, setStatus] = useState("wait");
  const orderID = navigation.getParam("orderID");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const response = await MechanicGetAPI.get("/mechanic");
      console.log(response.data.data.current_order);
      setResult(response.data.data.current_order);
      setStatus(response.data.data.current_order.status);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };
  const repair = async () => {
    try {
      const response = await MechanicOrder.post("/repairComplete", {
        _id: orderID,
      });

      console.log("FIXING", response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  const OnRepairPressed = async () => {
    await repair();
    navigation.navigate("Cost", {
      orderID: result._id,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        <Text>Add Labour Cost</Text>
        <TouchableOpacity style={styles.buton} onPress={OnRepairPressed}>
          <Text style={styles.textButton}>Repair Complete</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
  },
  buton: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 60,
    backgroundColor: theme.colors.primary,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 0,
    marginTop: 5,
    color: "white",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: "center",
    margin: 40,
    marginTop: 250,
  },
});

export default withNavigation(CostCalculate);
