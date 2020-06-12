import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import { Ionicons } from "@expo/vector-icons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFavs } from "../redux/usersSlice";

const { height } = Dimensions.get("screen");

const View = styled.View``;
const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
  position: relative;
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

const FavButton = styled.View`
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

const Touchable = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
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
}) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Touchable onPress={() => dispatch(toggleFavs(uuid))}>
        <FavButton>
          <Ionicons
            size={25}
            name={utils.isAndroid() ? "md-heart-empty" : "ios-heart-empty"}
          />
        </FavButton>
      </Touchable>
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
};

export default RoomCard;
