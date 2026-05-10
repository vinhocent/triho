import useSWR from "swr";
import { useEffect } from "react";
import { animate } from "motion";

import fetcher from "../lib/fetcher";
import { NowPlayingSong, PlayState } from "../types/post";

function AnimatedBars() {
  useEffect(() => {
    animate(
      "#bar1",
      {
        transform: [
          "scaleY(1.0) translateY(0rem)",
          "scaleY(1.5) translateY(-0.082rem)",
          "scaleY(1.0) translateY(0rem)",
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
    animate(
      "#bar2",
      {
        transform: [
          "scaleY(1.0) translateY(0rem)",
          "scaleY(3) translateY(-0.083rem)",
          "scaleY(1.0) translateY(0rem)",
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
    animate(
      "#bar3",
      {
        transform: [
          "scaleY(1.0)  translateY(0rem)",
          "scaleY(0.5) translateY(0.37rem)",
          "scaleY(1.0)  translateY(0rem)",
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ["ease-in-out"],
      }
    );
  }, []);

  return (
    <div className="w-auto flex items-end overflow-hidden">
      <span
        id="bar1"
        className="w-1 mr-[3px] h-2 bg-gray-300 dark:bg-gray-500 opacity-75"
      />
      <span
        id="bar2"
        className="w-1 mr-[3px] h-1 bg-gray-300 dark:bg-gray-500"
      />
      <span
        id="bar3"
        className="w-1 h-3 bg-gray-300 dark:bg-gray-500 opacity-80"
      />
    </div>
  );
}

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);

  if (!data?.songUrl || !data?.isPlaying) {
    return null;
  }

  return (
    <div className="flex flex-row-reverse items-center sm:flex-row  space-x-0 sm:space-x-2 w-full">
      <AnimatedBars />
      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        <a
          className="capsize text-gray-500 dark:text-gray-400 hover:dark:text-gray-100 hover:text-gray-800 font-medium  max-w-max ease-in transition-colors duration-200 "
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.title + " - " + data?.artist}
        </a>
      </div>
    </div>
  );
}
