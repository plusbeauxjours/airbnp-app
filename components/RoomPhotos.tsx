import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const PhotoContainer = styled.View<ITheme>`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  height: ${(props) => `${height / props.factor}`}px;
  border-radius: 4px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

interface ITheme {
  factor: number;
}

interface IProps {
  photos: any;
  factor?: number;
}

const RoomPhotos: React.FC<IProps> = ({ photos, factor = 4 }) => (
  <PhotoContainer factor={factor}>
    {photos.length === 0 ? (
      <SlideImage
        resizeMode="contain"
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
        {photos.map((photo, index) => (
          <SlideImage key={index} source={{ uri: photo.file }} />
        ))}
      </Swiper>
    )}
  </PhotoContainer>
);

export default RoomPhotos;
