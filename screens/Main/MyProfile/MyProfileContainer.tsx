import React from "react";
import MyProfilePresenter from "./MyProfilePresenter";

interface IProps {
  uuid: string;
  me: any;
}

const MyProfileContainer: React.FC<IProps> = ({ me }) => {
  return <MyProfilePresenter me={me} />;
};

export default MyProfileContainer;
