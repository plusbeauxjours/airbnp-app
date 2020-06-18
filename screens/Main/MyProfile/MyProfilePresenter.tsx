import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ScrollView, StatusBar } from "react-native";
import UserRooms from "../../../components/UserRooms";
import { Ionicons } from "@expo/vector-icons";
import utils from "../../../utils";

const Header = styled.View`
  width: 100%;
  height: 270px;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.2);
`;
const LoadingContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-top: 15px;
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
const Row = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const LogoutContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 50px 50px 0 0;
`;
const Touchable = styled.TouchableOpacity``;
export default ({ formatQty, roomLoading, me, rooms, userLogout }) => (
  <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
    <StatusBar barStyle="dark-content" />
    <Header>
      <LogoutContainer>
        <Touchable onPress={userLogout}>
          <Ionicons
            name={utils.isAndroid ? "md-log-out" : "ios-log-out"}
            size={28}
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </Touchable>
      </LogoutContainer>
      <Avatar
        source={
          me.avatar ? { uri: me.avatar } : require("../../../assets/avatar.png")
        }
      />
      <Row>
        <Text>{me.first_name}&nbsp;</Text>
        <Text>{me.last_name}</Text>
      </Row>
      <Row>
        <Username>@{me.username}</Username>
        {me.superhost && (
          <Superhost>
            <SuperhostText>Superhost</SuperhostText>
          </Superhost>
        )}
      </Row>
      <Row>
        <Text>{formatQty(me.room_count, "Room")}&nbsp;</Text>
        <Text>{formatQty(me.review_count, "Review")}</Text>
      </Row>
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
