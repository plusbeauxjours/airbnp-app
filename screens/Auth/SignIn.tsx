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

export default ({ route: { params } }) => {
  const [username, setUsername] = useState<string>(params?.email);
  const [password, setPassword] = useState<string>(params?.password);
  const handleSubmit = () => alert(`${username}, ${password}`);
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
