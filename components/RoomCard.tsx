import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";

const { height } = Dimensions.get("screen");

const View = styled.View``;
const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;

const Superhost = styled.View`
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceText = styled.Text`
  font-size: 16px;
`;

const PriceNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const PhotosContainer = styled.View`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  height: ${height / 4}px;
  border-radius: 4px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

interface IProps {
  uuid: string;
  isFav: boolean;
  isSuperHost: boolean;
  photos: any;
  name: string;
  price: number;
}

const RoomCard: React.FC<IProps> = ({
  uuid,
  isFav,
  isSuperHost,
  photos,
  name,
  price,
}) => (
  <Container>
    <PhotosContainer>
      {photos.length === 0 ? (
        <SlideImage
          resizeMode="repeat"
          source={require("../assets/roomDefault.jpeg")}
        />
      ) : (
        <Swiper
          controlsProps={{
            prevPos: false,
            nextPos: false,
            dotActiveStyle: {
              backgroundColor: "white",
            },
          }}
        >
          {photos.map((photo) => (
            <View key={photo.id}>
              <SlideImage source={{ uri: photo.file }} />
            </View>
          ))}
        </Swiper>
      )}
    </PhotosContainer>
    {isSuperHost ? (
      <Superhost>
        <SuperhostText>Superhost</SuperhostText>
      </Superhost>
    ) : null}
    <Name>{name}</Name>
    <PriceContainer>
      <PriceNumber>${price}</PriceNumber>
      <PriceText> / night</PriceText>
    </PriceContainer>
  </Container>
);

export default RoomCard;
