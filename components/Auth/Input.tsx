import React from "react";
import styled from "styled-components/native";

const Container = styled.TextInput`
  width: 250px;
  padding: 13px 20px;
  border: 1px solid grey;
  background-color: white;
  border-radius: 30px;
  margin-bottom: 10px;
  font-weight: 500;
`;

interface IProps {
  value?: string;
  placeholder?: string;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  stateFn: (text: string) => void;
}

const Input: React.FC<IProps> = ({
  value,
  placeholder,
  isPassword = false,
  autoCapitalize,
  stateFn,
}) => (
  <Container
    value={value}
    placeholder={placeholder}
    secureTextEntry={isPassword ? true : false}
    autoCapitalize={autoCapitalize}
    onChangeText={(text) => stateFn(text)}
  />
);
export default Input;
