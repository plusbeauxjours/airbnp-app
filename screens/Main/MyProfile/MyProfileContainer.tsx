import React, { useEffect, useState } from "react";
import MyProfilePresenter from "./MyProfilePresenter";

interface IProps {
  route: any;
  uuid: string;
  me: any;
  users: any;
  getUser: (uuid: string) => void;
}

const MyProfileContainer: React.FC<IProps> = ({
  route: { params },
  uuid,
  me,
  getUser,
}) => {
  useEffect(() => {
    getUser(uuid);
  }, []);
  return <MyProfilePresenter me={me} />;
};

export default MyProfileContainer;
