import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFavs } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import RoomPhotos from "./RoomPhotos";

const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
  position: relative;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;

const Superhost = styled.View`
  align-items: center;
  width: 80px;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 5px;
  margin-left: 5px;
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
  top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  padding: 0 10px;
`;

const UserNameContainer = styled(PriceContainer)``;
const Username = styled(PriceText)``;

const RowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

interface IProps {
  api?: boolean;
  uuid: string;
  isFav: boolean;
  username: string;
  isSuperHost: boolean;
  photos: any;
  name: string;
  price: number;
  roomObj: {};
}

function getIconName(isFav) {
  const isAndroid = utils.isAndroid();
  if (isAndroid) {
    if (isFav) {
      return "md-heart";
    }
    return "md-heart-empty";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-empty";
  }
}

const RoomCard: React.FC<IProps> = ({
  api = false,
  uuid,
  isFav,
  username,
  isSuperHost,
  photos,
  name,
  price,
  roomObj,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFavState, setIsFavState] = useState<boolean>(isFav);
  return (
    <Container>
      <IconTouchable
        onPress={() => {
          dispatch(toggleFavs(uuid));
          api && setIsFavState(!isFavState);
        }}
      >
        <FavButton>
          <Ionicons
            size={25}
            color={
              api
                ? isFavState
                  ? colors.red
                  : "black"
                : isFav
                ? colors.red
                : "black"
            }
            name={getIconName(api ? isFavState : isFav)}
          />
        </FavButton>
      </IconTouchable>
      <RoomPhotos photos={photos} />
      <Touchable
        onPress={() => navigation.navigate("RoomDetail", { ...roomObj })}
      >
        <Name>{name}</Name>
        <RowContainer>
          <UserNameContainer>
            <Username>{username}</Username>
            {isSuperHost ? (
              <Superhost>
                <SuperhostText>Superhost</SuperhostText>
              </Superhost>
            ) : null}
          </UserNameContainer>
          <PriceContainer>
            <PriceNumber>${price}</PriceNumber>
            <PriceText> / night</PriceText>
          </PriceContainer>
        </RowContainer>
      </Touchable>
    </Container>
  );
};

export default RoomCard;
