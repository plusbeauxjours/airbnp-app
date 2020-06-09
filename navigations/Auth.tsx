import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const View = styled.View``;

const Auth = createStackNavigator();
const isAndroid = Platform.OS === "android";

export default () => (
  <Auth.Navigator
    mode="modal"
    screenOptions={{
      headerBackTitleVisible: false,
      headerTransparent: true,
      headerBackImage: () => (
        <View style={{ paddingLeft: 20 }}>
          <Ionicons
            name={isAndroid ? "md-arrow-down" : "ios-arrow-down"}
            size={28}
          />
        </View>
      ),
    }}
  >
    <Auth.Screen name="Welcome" component={Welcome} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);
