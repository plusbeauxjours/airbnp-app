import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const PhotoContainer = styled.View`
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

interface IPhotos {
  uuid: string;
  file: string;
}
interface IProps {
  photos: IPhotos[];
}

const RoomPhotos: React.FC<IProps> = ({ photos }) => (
  <PhotoContainer>
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
          <SlideImage key={photo.uuid} source={{ uri: photo.file }} />
        ))}
      </Swiper>
    )}
  </PhotoContainer>
);

export default RoomPhotos;
