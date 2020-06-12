import React from "react";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

interface IProps {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  superuser: boolean;
}

const ProfilePresenter: React.FC<IProps> = ({
  uuid,
  username,
  first_name,
  last_name,
  email,
  avatar,
  superuser,
}) => (
  <View>
    <Text>{uuid}</Text>
    <Text>{username}</Text>
    <Text>{first_name}</Text>
    <Text>{last_name}</Text>
    <Text>{email}</Text>
    <Text>{avatar}</Text>
    <Text>{superuser}</Text>
  </View>
);

export default ProfilePresenter;
