import React, { useMemo, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function StarRating(props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userRate, setUserRate] = useState(false);
  const [sure, setSure] = useState(false);

  const doubleClickRating = () => {
    setRating(0);
    setRating(props.audiobookRating);
    setHover(props.audiobookRating);
    setSure(false);
    setUserRate(false);
  };

  const clickRating = (idx) => {
    setRating(idx);
  };

  const fetchData = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/user/audiobook/rating/add",
      "PUT",
      {
        audiobookId: props.audiobookDetail.id,
        categoryKey: props.categoryKey,
        rating: rating,
      },
      props.token
    )
      .then(() => {
        setUserRate(false);
        setSure(false);
      })
      .catch(() => {
        doubleClickRating();
      });
  };

  const clearBoard = () => {
    setRating(0);
    setHover(0);
    setSure(true);
    setUserRate(true);
  };

  useEffect(() => {
    setRating(props.audiobookRating);
    setHover(props.audiobookRating);
  }, [props.audiobookRating]);

  const starRating = useMemo(() => {
    return Array(props.count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <button
          type="button"
          key={uuidv4()}
          className={
            idx <= ((rating && hover) || hover)
              ? "on button-star"
              : "off button-star"
          }
          onClick={userRate ? () => clickRating(idx) : undefined}
          onMouseEnter={userRate ? () => setHover(idx) : undefined}
          onMouseLeave={userRate ? () => setHover(rating) : undefined}
          onDoubleClick={userRate ? () => doubleClickRating() : undefined}
        >
          <span className="star">&#9733;</span>
        </button>
      ));
  }, [rating, hover, userRate]);

  return (
    <div className="star-rating">
      <div className="row">
        <div className="col-5">{starRating}</div>
        <div className="col-4">
          {props.audiobookDetail.canRate ? (
            !sure ? (
              <Button onClick={() => clearBoard()} variant="success" size="sm">
                {props.t("rate")}
              </Button>
            ) : (
              <div className="row justify-content-center">
                <div className="col-6">
                  <Button
                    onClick={() => fetchData()}
                    variant="success"
                    size="sm"
                  >
                    {props.t("yes")}
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    onClick={() => doubleClickRating()}
                    variant="danger"
                    size="sm"
                  >
                    {props.t("no")}
                  </Button>
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
