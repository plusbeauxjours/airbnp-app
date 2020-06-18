import React from "react";
import styled from "styled-components/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import colors from "../../../colors";
import { mapStyle } from "../../../mapStyle";

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

const Touchable = styled.TouchableWithoutFeedback``;

const RoomContainer = styled.View`
  background-color: transparent;
  width: ${width}px;
  align-items: center;
`;

const RoomCard = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
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

const Superhost = styled.View`
  align-items: center;
  width: 80px;
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

interface IProps {
  latitude: number;
  longitude: number;
  altitude: number;
  navigation: any;
  currentIndex: number;
  mapRef: React.MutableRefObject<undefined>;
  rooms: any;
  onScroll: (e: any) => void;
  onRegionChangeComplete: () => void;
  setCurrentIndex: (currentIndex: number) => void;
}

const MapPresenter: React.FC<IProps> = ({
  latitude,
  longitude,
  altitude,
  navigation,
  currentIndex,
  mapRef,
  rooms,
  onScroll,
  onRegionChangeComplete,
  setCurrentIndex,
}) => (
  <Container>
    <StatusBar barStyle="dark-content" />
    <MapView
      // provider={PROVIDER_GOOGLE}
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      camera={{
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        altitude: altitude,
        pitch: 0,
        heading: 0,
        zoom: 10,
      }}
      onRegionChangeComplete={onRegionChangeComplete}
      // customMapStyle={mapStyle}
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
          <RoomMarker selected={index === currentIndex} price={room.price} />
        </Marker>
      ))}
    </MapView>
    <ScrollView
      scrollEventThrottle={50}
      onScroll={onScroll}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal
    >
      {rooms?.map((room, index) => (
        <Touchable
          key={index}
          onPress={() => navigation.navigate("RoomDetail", { ...room })}
        >
          <RoomContainer>
            <RoomCard>
              <RoomPhoto
                source={
                  room.photos[0]?.file
                    ? { uri: room.photos[0]?.file }
                    : require("../../../assets/roomDefault.jpeg")
                }
              />
              <Column>
                {room.user.superhost && (
                  <Superhost>
                    <SuperhostText>Superhost</SuperhostText>
                  </Superhost>
                )}
                <RoomName>{room.name}</RoomName>
                <RoomPrice>${room.price}</RoomPrice>
              </Column>
            </RoomCard>
          </RoomContainer>
        </Touchable>
      ))}
    </ScrollView>
  </Container>
);

export default MapPresenter;
