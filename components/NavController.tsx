import React from "react";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../navigations/Auth";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/usersSlice";

const Text = styled.Text``;

const Touchabele = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const { isLoggedIn } = useSelector((state: any) => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Touchabele onPress={() => dispatch(logOut())}>
          <Text>Log Out</Text>
        </Touchabele>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
