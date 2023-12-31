import React from "react";
import reviewStar from "../assets/reviewStar.svg";
import Image from "next/image";
import Link from "next/link";


const ReviewCard = ({ id, poster, rating, movie, user, review, pfp, date }) => {
  
  

  return (
    <article className="review flex gap-10 p-5 w-full" key={id}>
      <div className="hidden md:flex flex-col items-center w-[120px]">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/original${poster}`}
        />
        <p className="inline-flex justify-center items-center gap-1 mt-2">
          Rating: {rating}
          <span className="text-xl md:text-3xl text-star">&#9733;</span>
        </p>
      </div>
      <div className="flex flex-col justify-start gap-2 max-w-[1000px]">
        <h3 className="font-bold text-xl md:text-3xl">{movie}</h3>
        <div className="flex items-center gap-3">
          {
            user && <img
            className="w-[40px] h-[40px] rounded-full aspect-square"
            src={`http://localhost:8080/media/${user}.jpg`}
            alt={user}
          />

          }
          <Link href={`/profile/${user}`} className="font-semibold">
            {user}
          </Link>
        </div>
        <p className="break-words">{review}</p>
        <p className="text-sm text-gray">Reviewed at: {date}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
