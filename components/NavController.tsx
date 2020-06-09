import React, { useState } from "react";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../navigations/Auth";

const Text = styled.Text``;

const Touchabele = styled.TouchableOpacity``;

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Touchabele onPress={() => setIsLoggedIn(false)}>
          <Text>Log Out</Text>
        </Touchabele>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
