import React from "react";
import ProfilePresenter from "./ProfilePresenter";

interface IProps {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  superuser: boolean;
}

const ProfileContainer: React.FC<IProps> = ({
  uuid,
  username,
  first_name,
  last_name,
  email,
  avatar,
  superuser,
}) => {
  return (
    <ProfilePresenter
      uuid={uuid}
      username={username}
      first_name={first_name}
      last_name={last_name}
      email={email}
      avatar={avatar}
      superuser={superuser}
    />
  );
};

export default ProfileContainer;
