import { Movie } from "../../types/Movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { Thumbnail } from "../Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const [isLeftBounded, setIsLeftBounded] = useState<boolean>(true);
  const [isRightBounded, setIsRightBounded] = useState<boolean>(false);
  const [leftScroll, setLeftScroll] = useState<number>(0);
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rowRef.current) {
      let { scrollWidth, clientWidth } = rowRef.current;
      if (leftScroll <= 0) {
        setIsLeftBounded(true);
      } else if (leftScroll >= scrollWidth - clientWidth) {
        setIsRightBounded(true);
      } else {
        setIsLeftBounded(false);
        setIsRightBounded(false);
      }
    }
  }, [leftScroll]);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollValue =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollValue, behavior: "smooth" });
      setLeftScroll(scrollValue);
    }
  };
  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-64 cursor-pointer py-2 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-3xl">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          className={`chevron left-2 ${isLeftBounded && "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="md:h-48 flex items-center space-x-0.5 overflow-x-scroll md:space-x-4 scrollbar-hide hover"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className={`chevron right-2 ${isRightBounded && "hidden"}`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export { Row };
