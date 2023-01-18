import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import avatar from "../../../images/user-profile-icon-png.png";

const Review = ({ review, children }) => {
  const { name, description, photo, ratings, company } = review;

  return (
    <div
      style={{ height: "90%" }}
      className={children ? "d-flex justify-content-center" : ""}
    >
      <div
        style={children ? { maxWidth: "400px" } : { height: "100%" }}
        className={`text-center p-3 ${
          children ? "" : "mx-2 d-flex flex-column justify-content-between"
        } radius shadow my-3`}
      >
        <div>
          <img
            style={{ height: "100px", width: "100px" }}
            className="img-fluid rounded-pill"
            src={photo || avatar}
            alt=""
          />
          <h4 className="my-3">{name}</h4>
          <h6>{company}</h6>
          <p className="mt-3">{description}</p>
        </div>
        <div>
          {["rating1", "rating2", "rating3", "rating4", "rating5"].map(
            (rating, i) => (
              <FontAwesomeIcon
                key={rating}
                className={`${i < ratings && "selected-rating"}`}
                icon={faStar}
              />
            )
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Review;
