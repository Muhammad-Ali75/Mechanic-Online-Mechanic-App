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

const Waititng = ({ navigation }) => {
  const [status, setStatus] = useState("wait");

  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStatus();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const getStatus = async () => {
    try {
      const response = await MechanicGetAPI.get("/mechanic");
      console.log(response.data.data.current_order.status);
      setResult(response.data.data.current_order);
      setStatus(response.data.data.current_order.status);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  const fixing = async () => {
    try {
      const response = await MechanicOrder.post("/fixing", {
        _id: result._id,
      });
      console.log(response.data);
      //setResult(response.data.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  const OnMapPressed = async () => {
    navigation.navigate("Maps", {
      orderID: result._id,
      order: result,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ImageBackground
        source={require("../assets/background_dot.png")}
        resizeMode="repeat"
        style={styles.backgroundImg}
      >
        {status === "assigned" ? (
          <Text style={styles.header}>Order assigned</Text>
        ) : (
          <Text style={styles.header}>Waiting for order to be assigned</Text>
        )}
        {status === "assigned" ? (
          <TouchableOpacity style={styles.buton} onPress={OnMapPressed}>
            <Text style={styles.textButton}>Go to Maps</Text>
          </TouchableOpacity>
        ) : null}
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

export default withNavigation(Waititng);
