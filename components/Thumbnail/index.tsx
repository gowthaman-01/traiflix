import Image from "next/image";
import { Movie } from "../../types/Movie";
import { baseUrlThumbnail } from "../../constants/movie";
import { useRecoilState } from "recoil";
import { movieState, showPlayerState } from "../../recoil/atom";

export interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerState);
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transform-gpu transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-125 md:hover:z-10">
      <Image
        src={`${baseUrlThumbnail}${movie?.backdrop_path || movie?.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt="thumbnail"
        onClick={() => {
          setCurrentMovie(movie);
          setShowPlayer(true);
        }}
      />
    </div>
  );
};

export { Thumbnail };
