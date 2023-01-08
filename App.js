import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-gesture-handler";

import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ConfirmLocation from "./src/screens/ConfirmLocation";
import Waiting from "./src/screens/Waiting";
import Collect from "./src/screens/Collect";
import Chat from "./src/screens/Chat/Chat";
import { LoginScreen } from "./src/screens";
import Fix from "./src/screens/Fix";

import { LogBox } from "react-native";
import CostCalculate from "./src/screens/CostCalculate";

LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  "undefined is not an object",
  "componentWillReceiveProps has been renamed",
  "Unhandled promise rejection",
]);

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,

    Maps: MapScreen,
    ConfirmLocation: ConfirmLocation,
    Wait: Waiting,
    colct: Collect,
    Chat: Chat,
    Fix: Fix,
    Cost: CostCalculate,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "Mechanic App",
    },
  }
);

export default createAppContainer(navigator);

// Object {
//   "__v": 0,
//   "_id": "62c5c7b30509e1d715884188",
//   "age": 19,
//   "createdAt": "2022-07-06T17:34:43.339Z",
//   "current_order": Object {
//     "__v": 0,
//     "_id": "62c5c9b80509e1d7158844a5",
//     "buyer": "628bd79298a53fa951f9f99b",
//     "buyer_location": Object {
//       "coordinates": Array [
//         74.3584968,
//         31.5619562,
//       ],
//       "type": "Point",
//     },
//     "createdAt": "2022-07-06T17:43:20.149Z",
//     "isActive": true,
//     "mechanic": "62c5c7b30509e1d715884188",
//     "mechanic_location": Object {
//       "coordinates": Array [
//         74.245193,
//         31.431815,
//       ],
//       "type": "Point",
//     },
//     "order_items": Array [
//       Object {
//         "_id": "62c5c9b80509e1d7158844a6",
//         "quantity": 1,
//         "service": "6284df08d9109fe7a6d7abe1",
//       },
//     ],
//     "repair_cost": 350,
//     "status": "fixing",
//     "travel_charge": 150,
//     "updatedAt": "2022-07-06T17:46:16.242Z",
//     "workshop": "6283365f24760b24dfdba8ef",
//   },
//   "gender": "others",
//   "isActive": true,
//   "name": "mechanic1",
//   "password": "$2b$12$V9n0u4fKPrqidvcYvkDb7.i/mEF4GCTgDmfsJkR6fWLZ7tS2LfnZy",
//   "phone": 3041497684,
//   "picture": "http://res.cloudinary.com/mechanicoline/image/upload/v1657128837/m0e7y6s5zkktpceh2moq_ohpekl.jpg",
//   "role": "mechanic",
//   "status": "Working",
//   "updatedAt": "2022-07-06T17:43:26.062Z",
//   "username": "mechanic",
//   "workshop": "6283365f24760b24dfdba8ef",
// }
