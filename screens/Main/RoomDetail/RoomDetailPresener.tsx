import React from "react";
import styled from "styled-components/native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView } from "react-native";

import RoomPhotos from "../../../components/RoomPhotos";
import colors from "../../../colors";
import utils from "../../../utils";
import ReviewBox from "../../../components/ReviewBox";

const DataContainer = styled.View`
  padding: 0 10px;
  margin-bottom: 30px;
`;

const Address = styled.Text`
  margin: 10px 0;
  font-size: 20px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 10px;
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
  margin-bottom: 10px;
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

const ReviewUserRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
const ReviewUserName = styled.Text``;
const ReviewUserNameBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Superhost = styled.View`
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
`;

const SuperhostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
`;

const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const Touchable = styled.TouchableOpacity``;

export default ({
  navigation,
  reviewLoading,
  reviews,
  roomObj,
  isFavState,
  setIsFavState,
  toggleFavs,
  formatQty,
  formatTime,
  getIconName,
}) => (
  <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
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
      <ReviewUserRow>
        <Touchable
          onPress={() =>
            navigation.navigate("UserProfile", { user: roomObj.user })
          }
        >
          <ReviewUserNameBox>
            <Avatar
              source={
                roomObj.user.avatar
                  ? { uri: roomObj.user.avatar }
                  : require("../../../assets/avatar.png")
              }
            />

            <ReviewUserName>{roomObj.user.username}&nbsp;</ReviewUserName>
            {roomObj.user.superhost && (
              <Superhost>
                <SuperhostText>Superhost</SuperhostText>
              </Superhost>
            )}
          </ReviewUserNameBox>
        </Touchable>
      </ReviewUserRow>
      <PropertyInfoContainer>
        <PropertyInfoData>
          <PropertyInfoText>{formatQty(roomObj.beds, "bed")}</PropertyInfoText>
        </PropertyInfoData>
        <PropertyInfoData>
          <PropertyInfoText>
            {formatQty(roomObj.bedrooms, "bedroom")}
          </PropertyInfoText>
        </PropertyInfoData>
        <PropertyInfoData>
          <PropertyInfoText>
            {formatQty(roomObj.bathrooms, "bathroom")}
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
          // zoomEnabled={false}
          // scrollEnabled={false}
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
      {reviewLoading ? (
        <ActivityIndicator />
      ) : (
        reviews &&
        reviews.length !== 0 &&
        reviews.map((review, index) => (
          <ReviewBox key={index} review={review} />
        ))
      )}
    </DataContainer>
  </ScrollView>
);
