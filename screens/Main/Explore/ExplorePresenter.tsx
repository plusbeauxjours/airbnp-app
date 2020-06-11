import React from "react";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";
import { ActivityIndicator, ScrollView } from "react-native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

interface IProps {
  rooms: any;
}

const ExplorePresenter: React.FC<IProps> = ({ rooms }) => (
  <View>
    {rooms.length === 0 ? (
      <ActivityIndicator color="black" />
    ) : (
      <ScrollView
        style={{ width: "100%", marginTop: 120 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            name={room.name}
            price={room.price}
            photos={room.photos}
            uuid={room.uuid}
            isFav={room.is_fav}
            isSuperHost={room.user.superhost}
          />
        ))}
      </ScrollView>
    )}
  </View>
);

export default ExplorePresenter;
