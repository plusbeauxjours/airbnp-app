import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./screens/Welcome";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
const Auth = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Auth.Navigator>
        <Auth.Screen name="Welcome" component={Welcome} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="SignIn" component={SignIn} />
      </Auth.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
