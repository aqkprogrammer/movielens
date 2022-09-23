import React, { useContext } from "react";
import { AppContext } from "../../App";
import MoviesList from "../MoviesList";
import "./index.scss";

const TopRatedMovies = () => {
  const { top10Movies } = useContext(AppContext);

  return (
    <div className="top10Movies">
      {top10Movies && (
        <div className="fixedHeightContainer">
          <div className="content">
            <MoviesList data={top10Movies} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;
