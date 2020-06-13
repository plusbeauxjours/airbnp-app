import React from "react";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
  margin-top: 70px;
  padding: 0 30px;
`;

const ScrollView = styled.ScrollView``;

const Title = styled.Text`
  font-size: 36px;
  margin-bottom: 10px;
`;

const Text = styled.Text``;

const NoFavs = styled.Text``;

interface IProps {
  rooms: any;
}

const SavedPresenter: React.FC<IProps> = ({ rooms }) => (
  <Container>
    <Title>Favourites({rooms.length})</Title>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {rooms.length !== 0 ? (
        rooms.map((room) => (
          <RoomCard
            key={room.uuid}
            uuid={room.uuid}
            name={room.name}
            price={room.price}
            photos={room.photos}
            isFav={room.is_fav}
            isSuperHost={room.user.superhost}
            roomObj={room}
          />
        ))
      ) : (
        <NoFavs>You don't have any favs.</NoFavs>
      )}
    </ScrollView>
  </Container>
);

export default SavedPresenter;
