import React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";

const Touchable = styled.TouchableWithoutFeedback``;

const DismissKeyboard: React.FC = ({ children }) => {
  const onPress = () => Keyboard.dismiss();
  return <Touchable onPress={onPress}>{children}</Touchable>;
};

export default DismissKeyboard;
