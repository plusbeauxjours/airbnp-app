import React from "react";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";
import { ActivityIndicator, ScrollView } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  margin: 80px 0px 10px 0px;
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  width: 100%;
  padding: 10px 10px;
  align-items: center;
  background-color: #006a70;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const LoadMoreText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

interface IProps {
  rooms: any;
  increasePage: () => void;
}

const ExplorePresenter: React.FC<IProps> = ({ rooms, increasePage }) => (
  <Container>
    {rooms.length === 0 ? (
      <ActivityIndicator color="black" />
    ) : (
      <>
        <FakeBar>
          <FakeText>Search...</FakeText>
        </FakeBar>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingTop: 30 }}
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
              roomObj={room}
            />
          ))}
          <Touchable onPress={increasePage}>
            <LoadMore>
              <LoadMoreText>Load More</LoadMoreText>
            </LoadMore>
          </Touchable>
        </ScrollView>
      </>
    )}
  </Container>
);

export default ExplorePresenter;
