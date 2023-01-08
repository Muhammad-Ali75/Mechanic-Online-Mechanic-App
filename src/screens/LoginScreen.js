import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { UsernameValidator } from "../helpers/UsernameValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import MechanicAuth from "../core/api/MechanicAuth";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function loginApi(username, password) {
    try {
      const response = await MechanicAuth.post("/login", {
        username,
        password,
      });
      setResult(response.data);

      console.log(response.data.Bearer_token.accessToken);
      return response.data;
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went Wrong");
    }
  }

  const onLoginPressed = async () => {
    const usernameError = UsernameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      const status = await loginApi(username.value, password.value);
      if (status.message === "User authorized!") {
        await save("access_token", status.Bearer_token.accessToken);
        alert("Logged In");
        navigation.navigate("Home");
      }
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome back</Text>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={(text) => setUsername({ value: text, error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Text>{errorMessage}</Text>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    alignSelf: "center",
    marginTop: "40%",
  },
});
