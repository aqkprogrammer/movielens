import React from "react";
import Star from "./Star";
import "./rating.scss";

const RatingStars = (props) => {
  const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
  const activeStar = {
    fill: "yellow",
  };

  //   const getGrades = (rating) => {
  //     switch(rating) {
  //         case rating > 0 || rating <= 1:
  //             return "Poor";
  //         case rating > 1 || rating <= 2:
  //             return "Fair";
  //         case rating > 2 || rating <= 3:
  //             return "Good";
  //         case rating > 3 || rating <= 4:
  //             return "Very Good";
  //         case rating > 4 || rating <= 5:
  //             return "Excellent";
  //         default:
  //             return "No Rating";
  //     }
  //   }

  return (
    <div className="stars">
      {GRADES.map((grade, index) => (
        <Star
          index={index}
          key={grade}
          style={props.rating > index ? activeStar : {}}
        />
      ))}
    </div>
  );
};

export default RatingStars;
