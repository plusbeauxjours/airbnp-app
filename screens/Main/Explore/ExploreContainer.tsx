import React, { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

interface IProps {
  getRooms: any;
  rooms: any;
  page: number;
}

const ExploreContainer: React.FC<IProps> = ({ getRooms, rooms, page }) => {
  useEffect(() => {
    getRooms();
    console.log(rooms);
  }, []);
  return <ExplorePresenter rooms={rooms} />;
};

export default ExploreContainer;
