import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import BackBtn from "../components/Auth/BackBtn";
import AppleApproach from "../components/AppleApproach";

const Auth = createStackNavigator();

export default () => (
  <Auth.Navigator
    mode="modal"
    screenOptions={{
      headerBackTitleVisible: false,
      headerTransparent: true,
      headerBackImage: () => <BackBtn />,
    }}
  >
    <Auth.Screen
      name="Welcome"
      component={Welcome}
      options={{
        headerTitleStyle: {
          color: "white",
        },
      }}
    />
    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={{ title: "SingUp" }}
    />
    <Auth.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "SingIn" }}
    />
    <Auth.Screen
      name="AppleLogin"
      component={AppleApproach}
      options={{ title: "Apple LogIn" }}
    />
  </Auth.Navigator>
);
