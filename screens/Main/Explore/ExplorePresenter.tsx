import React from "react";
import styled from "styled-components/native";
import { Dispatch } from "redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Text = styled.Text``;

interface IProps {
  dispatch: Dispatch;
  logOut: ActionCreatorWithPayload<any, string>;
}

const ExplorePresenter: React.FC<IProps> = ({ dispatch, logOut }) => (
  <View>
    <Touchable onPress={() => dispatch(logOut())}>
      <Text>Explore</Text>
    </Touchable>
  </View>
);

export default ExplorePresenter;
