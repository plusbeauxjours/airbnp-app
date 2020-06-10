import React from "react";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

interface IProps {
  getRooms: () => (dispatch: any) => Promise<void>;
  rooms: any;
  page: number;
}

const ExplorePresenter: React.FC<IProps> = ({ getRooms, rooms, page }) => (
  <View>
    <Text>Explore</Text>
    {rooms.map((room) => (
      <Text>{room.uuid}</Text>
    ))}
  </View>
);

export default ExplorePresenter;
