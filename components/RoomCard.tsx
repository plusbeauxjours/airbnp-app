import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  margin-bottom: 50px;
  align-items: flex-start;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;

const Superhost = styled.View`
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

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceText = styled.Text`
  font-size: 16px;
`;

const PriceNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

interface IProps {
  uuid: string;
  isFav: boolean;
  isSuperHost: boolean;
  photos: number;
  name: string;
  price: number;
}

const RoomCard: React.FC<IProps> = ({
  uuid,
  isFav,
  isSuperHost,
  photos,
  name,
  price,
}) => (
  <Container>
    {isSuperHost && (
      <Superhost>
        <SuperhostText>Superhost</SuperhostText>
      </Superhost>
    )}
    <Name>{name}</Name>
    <PriceContainer>
      <PriceNumber>${price}</PriceNumber>
      <PriceText> / night</PriceText>
    </PriceContainer>
  </Container>
);

export default RoomCard;
