import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import UserReviews from "./UserReviews";
import colors from "../colors";
import { mapStyle } from "../mapStyle";

const { width } = Dimensions.get("screen");

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
const MarkerWrapper = styled.View`
  align-items: center;
`;

const MarkerContainer = styled.View<ITheme>`
  background-color: ${(props) => (props.selected ? colors.red : colors.green)};
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;

const MarkerText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const MarkerTriangle = styled.View<ITheme>`
  border: 10px solid transparent;
  width: 10px;
  border-top-color: ${(props) => (props.selected ? colors.red : colors.green)};
`;

const MapContainer = styled.View`
  height: 300px;
  margin: 10px;
`;

const RoomMarker = ({ selected, price }) => (
  <MarkerWrapper>
    <MarkerContainer selected={selected}>
      <MarkerText>${price}</MarkerText>
    </MarkerContainer>
    <MarkerTriangle selected={selected} />
  </MarkerWrapper>
);

interface ITheme {
  selected: boolean;
}

export default ({ rooms }) => {
  const mapRef = useRef();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation();
  const moveMap = () => {
    console.log(currentIndex);
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(rooms[currentIndex].lat),
          longitude: parseFloat(rooms[currentIndex].lng),
        },
      },
      { duration: 1000 }
    );
  };
  useEffect(() => {
    moveMap();
  }, [currentIndex]);
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
      <MapContainer>
        {rooms.length !== 0 && (
          <MapView
            // provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            camera={{
              center: {
                latitude: parseFloat(rooms[0].lat),
                longitude: parseFloat(rooms[0].lng),
              },
              altitude: 2000,
              pitch: 25,
              heading: 0,
              zoom: 10,
            }}
            customMapStyle={mapStyle}
            zoomEnabled={false}
            // scrollEnabled={false}
          >
            {rooms?.map((room, index) => (
              <Marker
                key={index}
                onPress={() => {
                  navigation.navigate("RoomDetail", { ...room });
                  setCurrentIndex(index);
                }}
                coordinate={{
                  latitude: parseFloat(room.lat),
                  longitude: parseFloat(room.lng),
                }}
              >
                <RoomMarker
                  selected={index === currentIndex}
                  price={room.price}
                />
              </Marker>
            ))}
          </MapView>
        )}
      </MapContainer>
      {rooms.length !== 0 && (
        <UserReviewContainer>
          <UserReviews uuid={rooms[currentIndex].uuid} />
        </UserReviewContainer>
      )}
    </>
  );
};
