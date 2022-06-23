import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrlBanner } from "../../constants/movie";
import { Movie } from "../../types/Movie";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  netflixOriginals: Movie[];
}
const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrlBanner}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title ? movie?.title : movie?.original_title}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="banner-button w-30 bg-white text-black transition duration-200 ease-out md:w-40 md:hover:scale-105">
          <FaPlay className="h-5 w-6 text-black md:h-8 md:w-9" />
          Play
        </button>
        <button className="banner-button w-30 md:w-50 bg-[gray]/70 transition duration-200 ease-out md:hover:scale-105">
          <AiOutlineInfoCircle className="h-6 w-7 md:h-9 md:w-10" />
          <strong>More Info</strong>
        </button>
      </div>
    </div>
  );
};

export { Banner };
