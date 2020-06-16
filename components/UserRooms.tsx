import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import UserReviews from "./UserReviews";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
  width: 100%;
  height: 330px;
  margin-top: 10px;
`;

const RoomContainer = styled.View`
  width: 100%;
  height: 250px;
  margin-bottom: 25px;
  align-items: flex-start;
  position: relative;
`;

const Name = styled.Text`
  font-size: 18px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceText = styled.Text`
  font-size: 16px;
`;

const InfoRow = styled.View`
  width: ${width - 20}px;
  margin: 0 10px 0 10px;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PriceNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const Touchable = styled.TouchableWithoutFeedback`
  width: 100%;
`;

const SlideImage = styled.Image`
  width: ${width - 20}px;
  margin: 10px;
  height: 100%;
  border-radius: 4px;
`;
const UserReviewContainer = styled.View`
  padding: 0 10px 0 10px;
`;

export default ({ rooms }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotActiveStyle: {
              backgroundColor: "white",
            },
          }}
          onIndexChanged={(i) => setCurrentIndex(i)}
        >
          {rooms.length !== 0 &&
            rooms.map((room, index) => (
              <>
                <Touchable
                  key={index}
                  onPress={() => navigation.navigate("RoomDetail", { ...room })}
                >
                  <RoomContainer>
                    {room.photos.length === 0 ? (
                      <SlideImage
                        resizeMode="repeat"
                        source={require("../assets/roomDefault.jpeg")}
                      />
                    ) : (
                      <SlideImage
                        key={index}
                        source={{ uri: room.photos[0].file }}
                      />
                    )}
                    <InfoRow>
                      <Name>{room.name}</Name>
                      <PriceContainer>
                        <PriceNumber>${room.price}</PriceNumber>
                        <PriceText> / night</PriceText>
                      </PriceContainer>
                    </InfoRow>
                  </RoomContainer>
                </Touchable>
              </>
            ))}
        </Swiper>
      </Container>
      {rooms.length !== 0 && (
        <UserReviewContainer>
          <UserReviews uuid={rooms[currentIndex].uuid} />
        </UserReviewContainer>
      )}
    </>
  );
};
