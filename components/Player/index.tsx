import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Element, Genre } from "../../types/Movie";
import { movieState, showPlayerState } from "../../recoil/atom";
import ReactPlayer from "react-player/lazy";

const Player = () => {
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState("");
  const [genre, setGenre] = useState<Genre[]>();

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
        setGenre(genreResponse);
      }
    };
    fetchTrailer();
  }, [movie, API_KEY]);
  return (
    <MuiModal open={showPlayer} onClose={handleClose}>
      <>
        <div className="p-24 flex">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            height="75%"
            width="75%"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
            playing
          />
        </div>
      </>
    </MuiModal>
  );
};

export { Player };
