import React, { useEffect } from "react";
import ProfilePresenter from "./ProfilePresenter";

interface IProps {
  getMe: () => void;
  me: any;
}

const ProfileContainer: React.FC<IProps> = ({ getMe, me }) => {
  useEffect(() => {
    getMe();
  }, []);
  return <ProfilePresenter />;
};

export default ProfileContainer;
