import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";

const Button = styled.View<ITheme>`
  margin-bottom: 25px;
  border: 1px solid
    ${(props) =>
      props.accent ? "transparent" : props.color ? props.color : colors.black};
  border-radius: 30px;
  padding: 13px 0px;
  align-items: center;
  width: 250px;
  background-color: ${(props) => (props.accent ? colors.red : "transparent")};
`;

const Text = styled.Text<ITheme>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) =>
    props.accent ? "white" : props.color ? props.color : colors.black};
`;

const Touchable = styled.TouchableOpacity``;

interface IProps {
  onPress: () => void;
  text: string;
  color?: string;
  accent?: boolean;
}

interface ITheme {
  accent?: boolean;
  color?: string;
}

const Btn: React.FC<IProps> = ({ onPress, text, accent = false, color }) => (
  <Touchable onPress={onPress}>
    <Button accent={accent} color={color}>
      <Text accent={accent} color={color}>
        {text}
      </Text>
    </Button>
  </Touchable>
);

export default Btn;
