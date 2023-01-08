import axios from "axios";
import * as SecureStore from "expo-secure-store";

const MechanicGetAPI = axios.create({
  baseURL: "https://mechaniconline.herokuapp.com/api/v1",
});

MechanicGetAPI.interceptors.request.use(async function (config) {
  const token = await SecureStore.getItemAsync("access_token");
  if (!token) return config;

  config.headers["Authorization"] = token;

  return config;
});

export default MechanicGetAPI;
