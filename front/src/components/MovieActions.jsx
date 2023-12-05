"use client";

import React, { useState } from "react";
import watchlistIcon from "@/assets/watchlistIcon.svg";
import favMovieIcon from "@/assets/favMovieIcon.svg";
import RatingComponent from "./RatingComponent";
import { getStorageData } from "@/controllers/localStorageController";

const MovieActions = ({ movieId }) => {
  const [movieFaved, setMovieFaved] = useState(null);

  const userData = getStorageData();
  

  const handleFav = async () => {

    const res = await fetch(`http://localhost:8080/fav/add/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, username }),
    });
  };

  return (
    <div className="bg-menu rounded-md p-2 mb-2">
      <div className="flex justify-center gap-3">
        <button onClick={handleFav} className="w-[35px]">
          <img src={watchlistIcon.src} alt="Watchlist eye icon" />
        </button>
        <button className="w-[35px]">
          <img src={favMovieIcon.src} alt="Watchlist eye icon" />
        </button>
      </div>
      <div className="text-center">
        <p>Rate this movie</p>
        <RatingComponent />
      </div>
    </div>
  );
};

export default MovieActions;

