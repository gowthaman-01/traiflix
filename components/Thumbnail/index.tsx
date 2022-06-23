import Image from "next/image";
import { Movie } from "../../types/Movie";
import { baseUrlThumbnail } from "../../constants/movie";

export interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transform-gpu transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-125 md:hover:z-10">
      <Image
        src={`${baseUrlThumbnail}${movie?.backdrop_path || movie?.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};

export { Thumbnail };
