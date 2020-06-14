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
  height: 200px;
  margin-right: 20px;
`;

const RoomName = styled.Text``;

interface IProps {
  rooms: any;
}

const MapPresenter: React.FC<IProps> = ({ rooms }) => (
  <Container>
    <MapView style={StyleSheet.absoluteFill} />
    <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
      {rooms?.map((room, index) => (
        <RoomContainer key={index}>
          <RoomCard>
            <RoomName>{room.name}</RoomName>
          </RoomCard>
        </RoomContainer>
      ))}
    </ScrollView>
  </Container>
);

export default MapPresenter;
