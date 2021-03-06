import React from "react";
import styled from "styled-components/native";
import {
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  loading: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
}

const SignInpresenter: React.FC<IProps> = ({
  loading,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator />
      </LoadingContainer>
    );
  } else {
    return (
      <DismissKeyboard>
        <Container>
          <StatusBar barStyle="dark-content" />
          <KeyboardAvoidingView behavior="position">
            <InputContainer>
              <Input
                value={email}
                placeholder="Email"
                keyboardType="email-address"
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
            <Btn text={"SignIn"} accent onPress={handleSubmit} />
          </KeyboardAvoidingView>
        </Container>
      </DismissKeyboard>
    );
  }
};

export default SignInpresenter;
