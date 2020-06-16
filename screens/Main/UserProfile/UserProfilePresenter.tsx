import React from "react";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default ({ user }) => (
  <View>
    <Text>{user.username}</Text>
    <Text>{user.uuid}</Text>
  </View>
);
