import React from "react";
import styled from "styled-components/native";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import DismissKeyboard from "../../../components/DismissKeyboard";
import Input from "../../../components/Auth/Input";
import Btn from "../../../components/Auth/Btn";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.View`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastname: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  handleSubmit: () => void;
}
const SignInpresenter: React.FC<IProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit,
}) => (
  <DismissKeyboard>
    <Container>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position">
        <InputContainer>
          <Input
            value={firstName}
            placeholder="First Name"
            autoCapitalize="words"
            stateFn={setFirstName}
          />
          <Input
            value={lastName}
            placeholder="Last Name"
            autoCapitalize="words"
            stateFn={setLastName}
          />
          <Input
            keyboardType={"email-address"}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            stateFn={setEmail}
          />
          <Input
            value={password}
            placeholder="Password"
            isPassword={true}
            stateFn={setPassword}
          />
        </InputContainer>
        <Btn loading={loading} text={"Sign Up"} accent onPress={handleSubmit} />
      </KeyboardAvoidingView>
    </Container>
  </DismissKeyboard>
);
export default SignInpresenter;
