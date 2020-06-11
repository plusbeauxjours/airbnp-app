import React, { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

interface IProps {
  getRooms: (page: number) => void;
  increasePage: () => void;
  rooms: any;
  page: number;
}

const ExploreContainer: React.FC<IProps> = ({
  getRooms,
  increasePage,
  rooms,
  page,
}) => {
  useEffect(() => {
    getRooms(1);
  }, []);
  useEffect(() => {
    getRooms(page);
  }, [page]);
  return <ExplorePresenter rooms={rooms} increasePage={increasePage} />;
};

export default ExploreContainer;
