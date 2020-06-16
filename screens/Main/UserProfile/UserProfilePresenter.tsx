import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ScrollView } from "react-native";
import UserRooms from "../../../components/UserRooms";

const Header = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.2);
`;
const LoadingContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  margin-bottom: 5px;
`;
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-top: 80px;
  margin-bottom: 20px;
`;
const Superhost = styled.View`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin-left: 5px;
`;
const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
`;
const UsernameRow = styled.View`
  flex-direction: row;
`;

export default ({ roomLoading, user, rooms }) => (
  <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
    <Header>
      {console.log(user)}
      <Avatar
        source={
          user.avatar
            ? { uri: user.avatar }
            : require("../../../assets/avatar.png")
        }
      />
      <UsernameRow>
        <Text>{user.first_name}&nbsp;</Text>
        <Text>{user.last_name}</Text>
      </UsernameRow>
      <UsernameRow>
        <Username>@{user.username}</Username>
        {user.superhost && (
          <Superhost>
            <SuperhostText>Superhost</SuperhostText>
          </Superhost>
        )}
      </UsernameRow>
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
