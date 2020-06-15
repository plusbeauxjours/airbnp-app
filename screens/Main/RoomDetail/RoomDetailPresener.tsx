import React from "react";
import styled from "styled-components/native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import RoomPhotos from "../../../components/RoomPhotos";
import colors from "../../../colors";
import utils from "../../../utils";

const Container = styled.ScrollView``;

const DataContainer = styled.View`
  padding: 0 20px;
`;

const Address = styled.Text`
  margin-top: 10px;
  font-size: 20px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;

const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
`;

const CheckContainer = styled.View`
  margin-top: 40px;
`;

const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckTitle = styled.Text`
  font-size: 18px;
  margin-left: 15px;
`;

const CheckTime = styled.Text`
  margin-top: 10px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 30px;
`;

const FavButton = styled.View`
  background-color: white;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
`;

const IconTouchable = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 100px;
`;

export default ({
  roomObj,
  isFavState,
  setIsFavState,
  toggleFavs,
  formatQtt,
  formatTime,
  getIconName,
}) => (
  <Container>
    <IconTouchable
      onPress={() => {
        toggleFavs(roomObj.uuid, roomObj);
        setIsFavState(!isFavState);
      }}
    >
      <FavButton>
        <Ionicons
          size={25}
          color={isFavState ? colors.red : "black"}
          name={getIconName(isFavState)}
        />
      </FavButton>
    </IconTouchable>
    <RoomPhotos photos={roomObj.photos} factor={2} />
    <DataContainer>
      <Address>
        {roomObj.address} / ${roomObj.price}
      </Address>
      <PropertyInfoContainer>
        <PropertyInfoData>
          <PropertyInfoText>{formatQtt(roomObj.beds, "bed")}</PropertyInfoText>
        </PropertyInfoData>
        <PropertyInfoData>
          <PropertyInfoText>
            {formatQtt(roomObj.bedrooms, "bedroom")}
          </PropertyInfoText>
        </PropertyInfoData>
        <PropertyInfoData>
          <PropertyInfoText>
            {formatQtt(roomObj.bathrooms, "bathroom")}
          </PropertyInfoText>
        </PropertyInfoData>
      </PropertyInfoContainer>
      <CheckContainer>
        <CheckTitleContainer>
          <Ionicons
            name={utils.isAndroid() ? "md-timer" : "ios-timer"}
            size={24}
          />
          <CheckTitle>Check-in / Check-out</CheckTitle>
        </CheckTitleContainer>
        <CheckTime>
          {formatTime(roomObj.check_in)} / {formatTime(roomObj.check_out)}
        </CheckTime>
      </CheckContainer>
      <MapContainer>
        <MapView
          camera={{
            center: {
              latitude: parseFloat(roomObj.lat),
              longitude: parseFloat(roomObj.lng),
            },
            altitude: 10 * 200,
            pitch: 25,
            heading: 0,
            zoom: 10,
          }}
          zoomEnabled={false}
          scrollEnabled={false}
          style={{ height: "100%", width: "100%" }}
        >
          <Marker
            coordinate={{
              longitude: parseFloat(roomObj.lng),
              latitude: parseFloat(roomObj.lat),
            }}
          />
        </MapView>
      </MapContainer>
    </DataContainer>
  </Container>
);
