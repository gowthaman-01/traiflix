import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Element, Genre } from "../../types/Movie";
import { movieState, showPlayerState } from "../../recoil/atom";
import ReactPlayer from "react-player/lazy";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>();
  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(true);

  const handleClose = () => setShowPlayer(false);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  useEffect(() => {
    if (!movie) return;
    const fetchTrailer = async () => {
      let movieVideoResponse = null;
      let tvVideoResponse = null;
      movieVideoResponse = await fetch(
        `${BASE_URL}/movie/${movie?.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch(() => null);
      if (movieVideoResponse?.success === false) {
        movieVideoResponse = null;
      }
      tvVideoResponse = await fetch(
        `${BASE_URL}/tv/${movie?.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch(() => null);
      if (tvVideoResponse?.success === false) {
        tvVideoResponse = null;
      }
      const videoResponse =
        movieVideoResponse?.videos?.results || tvVideoResponse?.videos?.results;
      const genreResponse =
        movieVideoResponse?.genres || tvVideoResponse?.genres;
      if (videoResponse) {
        const index = videoResponse.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(videoResponse[index]?.key);
        setGenres(genreResponse);
      }
    };
    fetchTrailer();
  }, [movie, API_KEY]);
  return (
    <MuiModal
      open={showPlayer}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${
              trailer || "dQw4w9WgXcQ&ab_channel=RickAstley"
            }`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={play}
            muted={muted}
            controls
            onPlay={() => setPlay(true)}
            onPause={() => setPlay(false)}
          />
          <div className="absolute bottom flex w-full items-center justify-between px-6 bg-black pt-5 pb-6">
            <div className="flex space-x-4">
              <button
                className="w-40 flex items-center gap-x-4 rounded bg-white px-7 text-xl font-bold text-black transition duration-200 hover:bg-[#e6e6e6]"
                onClick={() => setPlay((prevState) => !prevState)}
              >
                {play ? (
                  <>
                    <FaPause className="h-7 w-7 text-black" />
                    Pause
                  </>
                ) : (
                  <>
                    <FaPlay className="h-7 w-7 text-black" />
                    Play
                  </>
                )}
              </button>
              <button className="player-button">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="player-button">
                <ThumbUpIcon className="h-6 w-6" />
              </button>

              <button
                className="player-button"
                onClick={() => setMuted((prevState) => !prevState)}
              >
                {muted ? (
                  <VolumeOffIcon className="h-6 w-6" />
                ) : (
                  <VolumeUpIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            <button className="player-button " onClick={handleClose}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-20 flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-3 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-1 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres?.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total Votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export { Player };
