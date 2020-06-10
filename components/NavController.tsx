import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../navigations/Auth";
import { useSelector, useDispatch } from "react-redux";
import Main from "navigations/Main";

export default () => {
  const { isLoggedIn } = useSelector((state: any) => state.usersReducer);
  return (
    <NavigationContainer>
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};
