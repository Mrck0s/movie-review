import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";

const MoviePoster = ({ id, poster, title, carousel }) => {
  return (
    //La props carousel se usa solamente cuando se llama a la libreria keen-slider.
    <div
      className={`${
        carousel ? "keen-slider__slide" : "w-[130px] md:w-[190px]"
      }`}
      key={id}
    >
      <Link href={`http://localhost:3000/movie/${id}`}>
        <Image
          className="border border-white rounded-sm min-w-full min-h-full"
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          width={300}
          height={300}
          alt={`${title} poster`}
        />
      </Link>
    </div>
  );
};

export default MoviePoster;
