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
  }, []);
  return <ExplorePresenter getRooms={getRooms} rooms={rooms} page={page} />;
};

export default ExploreContainer;
