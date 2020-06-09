import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default ({ navigation }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Button onPress={() => navigation.navigate("SignUp")} title={"Sign Up"} />
      <Button onPress={() => navigation.navigate("SignIn")} title={"Sign In"} />
    </View>
  );
};
