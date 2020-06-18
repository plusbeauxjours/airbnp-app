import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { BlurView } from "expo-blur";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import utils from "../utils";
import BackBtn from "../components/Auth/BackBtn";
import Explore from "../screens/Main/Explore";
import Saved from "../screens/Main/Saved";
import MapScreen from "../screens/Main/Map";
import MyProfile from "../screens/Main/MyProfile";
import UserProfile from "../screens/Main/UserProfile";
import RoomDetail from "../screens/Main/RoomDetail";
import Search from "../screens/Main/Search";

const TabNavigator = createBottomTabNavigator();

const Tabs = () => (
  <TabNavigator.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      tabStyle: {
        paddingTop: 10,
      },
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600",
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const isAndroid = utils.isAndroid();
        let iconName = `${isAndroid ? "md-" : "ios-"}`;
        if (route.name === "Explore") {
          iconName += "search";
        } else if (route.name === "Saved") {
          iconName += "heart";
        } else if (route.name === "Map") {
          iconName += "map";
        } else if (route.name === "MyProfile") {
          iconName += "person";
        }
        return (
          <Ionicons
            name={iconName}
            size={24}
            color={focused ? colors.red : "grey"}
          />
        );
      },
    })}
  >
    <TabNavigator.Screen name="Explore" component={Explore} />
    <TabNavigator.Screen name="Saved" component={Saved} />
    <TabNavigator.Screen name="Map" component={MapScreen} />
    <TabNavigator.Screen name="MyProfile" component={MyProfile} />
  </TabNavigator.Navigator>
);

const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator
    mode="modal"
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}
  >
    <MainNavigator.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <MainNavigator.Screen
      name="RoomDetail"
      component={RoomDetail}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={80}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
    <MainNavigator.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={80}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
    <MainNavigator.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
    />
  </MainNavigator.Navigator>
);
