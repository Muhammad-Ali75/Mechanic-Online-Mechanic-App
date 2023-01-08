import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import { theme } from "../core/theme";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header style={styles.text}>Welcome!</Header>

          <TouchableOpacity
            style={styles.buton}
            onPress={() => navigation.navigate("Wait")}
          >
            <Text style={styles.textButton}>Order</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buton}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={styles.textButton}>Chat</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 50,
    margin: 30,
    fontSize: 30,
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  textFade: {
    marginTop: 0,
    marginLeft: 20,
    marginBottom: 10,
    margin: 10,
    textAlign: "left",
    color: "#EAE7E6",
  },
  textButton: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    color: "white",
  },
  buton: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: theme.colors.primary,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
  },
});

export default HomeScreen;
