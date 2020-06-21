import React, { useState } from "react";
import styled from "styled-components/native";
import * as AppleAuthentication from "expo-apple-authentication";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import api from "../api";
import { appleLogin } from "../redux/usersSlice";

const Touchable = styled.TouchableOpacity``;

const LoginTextContainer = styled.View`
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.View`
  margin-bottom: 25px;
  border-radius: 30px;
  padding: 13px 0px;
  align-items: center;
  width: 250px;
  background-color: black;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: white;
  margin-left: 10px;
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const appleLoginFn = async () => {
    try {
      setLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const {
          data: { uuid, token },
        } = await api.appleLogin({
          first_name: credential.fullName.givenName,
          last_name: credential.fullName.familyName,
          email: credential.email,
          username: credential.email,
          apple_id: credential.user,
        });
        dispatch(appleLogin(uuid, token));
      }
    } catch (e) {
      alert("Your Email is already taken. Please LogIn with Email.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Touchable
      disabled={loading}
      onPress={() => {
        appleLoginFn();
      }}
    >
      <Button>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <LoginTextContainer>
            <Ionicons name={"logo-apple"} size={25} color={"white"} />
            <Text>Sign in with Apple</Text>
          </LoginTextContainer>
        )}
      </Button>
    </Touchable>
  );
};
