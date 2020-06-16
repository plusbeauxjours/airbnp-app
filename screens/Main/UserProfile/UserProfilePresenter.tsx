import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ScrollView } from "react-native";
import colors from "../../../colors";
import UserRooms from "../../../components/UserRooms";

const Header = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.green};
`;
const LoadingContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

export default ({ roomLoading, user, rooms }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ width: "100%", marginBottom: 30 }}
  >
    <Header>
      <Text>{user.username}</Text>
      <Text>{user.uuid}</Text>
    </Header>
    {roomLoading ? (
      <LoadingContainer>
        <ActivityIndicator color="black" />
      </LoadingContainer>
    ) : (
      <UserRooms rooms={rooms} />
    )}
  </ScrollView>
);
