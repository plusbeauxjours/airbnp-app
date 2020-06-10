import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import Map from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";
import colors from "../colors";

const Main = createBottomTabNavigator();

export default () => (
  <Main.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600",
      },
    }}
  >
    <Main.Screen name="Explore" component={Explore} />
    <Main.Screen name="Saved" component={Saved} />
    <Main.Screen name="Map" component={Map} />
    <Main.Screen name="Profile" component={Profile} />
  </Main.Navigator>
);
