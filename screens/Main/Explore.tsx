import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/usersSlice";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const Text = styled.Text``;

export default () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Touchable onPress={() => dispatch(logOut())}>
        <Text>Explore</Text>
      </Touchable>
    </Container>
  );
};
