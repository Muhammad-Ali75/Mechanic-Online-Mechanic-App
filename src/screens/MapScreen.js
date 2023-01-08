import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { theme } from "../core/theme";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import call from "react-native-phone-call";
import MechanicOrder from "../core/api/MechanicOrder";
import { withNavigation } from "react-navigation";


function CustomMarker() {
  return (
    <View style={styles.marker}>
      <Text style={styles.text}>You</Text>
    </View>
  );
}
function CustomMarker2() {
  return (
    <View style={styles.marker}>
      <Text style={styles.text}>Customer</Text>
    </View>
  );
}

const triggerCall = (num) => {
  const args = {
    number: `${num}`,
    prompt: true,
    skipCanOpen: true,
  };
  call(args).catch(console.error);
};

const mapScreen = ({ navigation }) => {
  const orderID = navigation.getParam("orderID");
  console.log(orderID);
  const order = navigation.getParam("order");
  const destination = {
    latitude: order.buyer_location.coordinates[1],
    longitude: order.buyer_location.coordinates[0],
  };
  const GOOGLE_MAPS_APIKEY = "AIzaSyCw9TUCbz3ThruzHYOPe7vJQKe4yjl9i1I";
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const [res, setRes] = useState(null);
  const [buton, setButton] = useState("Set Travel");

  const getStatus = async () => {
    try {
      const response = await UserOrder.post("/getById", {
        _id: orderID,
      });
      console.log(response.data.data);
      setRes(response.data.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  const costCalculated = async () => {
    try {
      const response = await MechanicOrder.post("/costCalculated", {
        _id: orderID,
      });

      console.log("abc", response);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };
  const OnCostPressed = async () => {
    await costCalculated();
    navigation.navigate("colct", {
      orderID: orderID,
      order: order,
    });
  };
  const OnChatPressed = () => {
    navigation.navigate("Chat", {
      orderID: orderID,
    });
  };

  const travel = async () => {
    try {
      const response = await MechanicOrder.post("/travel", {
        _id: orderID,
      });

      console.log("TRAVEL", response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };
  const onTravelPressed = async () => {
    await travel();
    setButton("Reached");
  };
  const fixing = async () => {
    try {
      const response = await MechanicOrder.post("/fixing", {
        _id: orderID,
      });

      console.log("FIXING", response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };
  const reached = async () => {
    try {
      const response = await MechanicOrder.post("/reached", {
        _id: orderID,
      });

      console.log("REACHED", response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Something went Wrong");
    }
  };
  const onReachedPressed = async () => {
    await reached();
    await fixing();
    navigation.navigate("Fix", { orderID: orderID });
  };

  const [inputValue, setInputValue] = useState("+923041497684");

  return (
    <>
      <NavigationBar
        
        rightButton={{
          title: "Collect Cash",
          handler: () => navigation.navigate("colct"),
        }}
      />
      <View style={styles.container0}>
        <ImageBackground
          source={require("../assets/background_dot.png")}
          resizeMode="repeat"
          style={styles.backgroundImg}
        >
          <Text style={styles.header}>Track</Text>

          <View style={styles.container01}>
            <View style={styles.textContainer}>
              <TouchableOpacity>
                <Ionicons
                  name="person-circle-sharp"
                  size={40}
                  color={theme.colors.primary}
                />
                <Text style={styles.textButton}>ali</Text>
              </TouchableOpacity>

              <Text>{"\n"}Number:</Text>
              <Text>
                {"\n"}
                {inputValue}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buton}
                onPress={() => triggerCall(inputValue)}
              >
                <FontAwesome name="phone" size={24} color={"white"} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buton} onPress={OnChatPressed}>
                <Entypo name="chat" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: 31.582045,
            longitude: 74.329376,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && (
            <Marker coordinate={location}>
              <CustomMarker />
            </Marker>
          )}
          {location && (
            <Marker coordinate={destination}>
              <CustomMarker2 />
            </Marker>
          )}
          <MapViewDirections
            origin={location}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#1E81B0"
          />
        </MapView>
      </View>
      {buton === "Set Travel" ? (
        <TouchableOpacity style={styles.butonHover} onPress={onTravelPressed}>
          <Text style={styles.textHoverButton}>{buton}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.butonHover} onPress={onReachedPressed}>
          <Text style={styles.textHoverButton}>{buton}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    alignSelf: "center",
    marginTop: "1%",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
  container0: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  container01: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F3F4",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    height: "65%",
    width: "100%",
  },
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-around",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    width: "30%",
    height: "80%",
    backgroundColor: theme.colors.primary,
  },
  textButton: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
  },
  marker: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  butonHover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: 60,
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    top: "83%",
    left: "20%",
  },
  textHoverButton: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

export default withNavigation(mapScreen);
