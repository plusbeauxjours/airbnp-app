import React, { useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import { Keyboard, StatusBar, KeyboardAvoidingView } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => alert(`${username}, ${password}`);
  const dismissKeyboard = () => Keyboard.dismiss();
  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position">
          <InputContainer>
            <Input
              value={username}
              autoCapitalize="none"
              placeholder="Username"
              stateFn={setUsername}
            />
            <Input
              value={password}
              autoCapitalize="none"
              placeholder="Password"
              isPassword={true}
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn text={"Sign In"} accent onPress={handleSubmit} />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};

export default SignIn;