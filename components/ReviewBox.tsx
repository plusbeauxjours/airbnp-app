import React from "react";
import Moment from "moment";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ReviewText = styled.Text``;
const ReviewDate = styled.Text`
  margin-top: 10px;
  font-size: 10px;
  color: grey;
`;

const ReviewBox = styled.View`
  border-radius: 4px;
  border: 0.5px solid grey;
  padding: 5px 10px 20px 10px;
  margin-bottom: 10px;
`;
const ReviewUserName = styled.Text``;

const Superhost = styled.View`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
`;

const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const Touchable = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
`;

export default ({ review }) => {
  const navigation = useNavigation();
  return (
    <ReviewBox>
      <Touchable
        onPress={() =>
          navigation.navigate("UserProfile", { user: review.user })
        }
      >
        <Avatar
          source={
            review.user.avatar
              ? { uri: review.user.avatar }
              : require("../assets/avatar.png")
          }
        />
        <ReviewUserName>{review.user.username}&nbsp;</ReviewUserName>
        {review.user.superhost && (
          <Superhost>
            <SuperhostText>Superhost</SuperhostText>
          </Superhost>
        )}
      </Touchable>
      <ReviewText> {review.text}</ReviewText>
      <ReviewDate>{Moment(review.created_at).format("MMM-DD-YYYY")}</ReviewDate>
    </ReviewBox>
  );
};
