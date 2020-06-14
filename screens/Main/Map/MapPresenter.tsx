import React from "react";
import styled from "styled-components/native";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  position: absolute;
  bottom: 50px;
`;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;

const RoomCard = styled.View`
  background-color: white;
  width: ${width - 80}px;
  height: 120px;
  margin-right: 20px;
  border-radius: 10px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
`;

const RoomPhoto = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 20px;
`;

const Column = styled.View`
  width: 70%;
`;

const RoomName = styled.Text`
  font-size: 18px;
`;

const RoomPrice = styled.Text`
  margin-top: 5px;
  font-size: 16px;
`;

interface IProps {
  rooms: any;
}

const MapPresenter: React.FC<IProps> = ({ rooms }) => (
  <Container>
    <MapView
      style={StyleSheet.absoluteFill}
      camera={{
        center: {
          latitude: parseFloat(rooms[0].lat),
          longitude: parseFloat(rooms[0].lng),
        },
        altitude: 10 * 200,
        pitch: 25,
        heading: 0,
        zoom: 10,
      }}
    />
    <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
      {rooms?.map((room, index) => (
        <RoomContainer key={index}>
          <RoomCard>
            <RoomPhoto
              source={
                room.photos[0]?.file
                  ? { uri: room.photos[0]?.file }
                  : require("../../../assets/roomDefault.jpeg")
              }
            />
            <Column>
              <RoomName>{room.name}</RoomName>
              <RoomPrice>${room.price}</RoomPrice>
              <RoomName>
                {room.lat}
                {room.lng}
              </RoomName>
            </Column>
          </RoomCard>
        </RoomContainer>
      ))}
    </ScrollView>
  </Container>
);

export default MapPresenter;
