import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Picture, pictures } from "../data/pictures";

const ASCII_FRAME_COUNT = 24;
const LOOP_PERIOD = Math.PI * 2;
const ASCII_FRAMES = Array.from({ length: ASCII_FRAME_COUNT }, (_, phase) =>
  Array.from({ length: 144 }, (_, row) =>
    Array.from({ length: 220 }, (_, col) => {
      const noise =
        Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
      const grain = noise - Math.floor(noise);
      const t = (phase / ASCII_FRAME_COUNT) * LOOP_PERIOD;
      const wave =
        Math.sin(col * 0.18 + row * 0.07 + t * 1) +
        Math.sin(row * 0.31 + grain * 2.8 + t * 2) +
        Math.sin((col + row) * 0.055 + grain * 4.5 - t * 3) +
        (grain - 0.5) * 1.8;
      const chars = " .:-=+*#%@";
      const index = Math.max(
        0,
        Math.min(chars.length - 1, Math.floor(((wave + 4) / 8) * chars.length))
      );
      return chars[index];
    }).join("")
  ).join("\n")
);

const Design: NextPage = () => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);
  const [asciiFrame, setAsciiFrame] = useState(0);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  const closeLightbox = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    setIsLightboxClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setSelectedPicture(null);
      setIsLightboxClosing(false);
      closeTimer.current = null;
    }, 220);
  };

  useEffect(() => {
    if (!selectedPicture) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const asciiTimer = window.setInterval(() => {
      setAsciiFrame((frame) => (frame + 1) % ASCII_FRAME_COUNT);
    }, 220);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.clearInterval(asciiTimer);
    };
  }, [selectedPicture]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <div className="px-8 ">
      <div className=" flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <h1
          className={
            "font-bold text-3xl md:text-5xl tracking-tight mb-8 flex text-black dark:text-white transition-opacity duration-600 " +
            fading
          }
        >
          design
        </h1>

        <ul
          className={
            "w-full columns-2 gap-2 space-y-2 p-0 md:columns-3 md:gap-3 md:space-y-3 transition-opacity duration-600 delay-800 " +
            fading
          }
        >
          {pictures.map((picture, i) => (
            <li
              key={picture.src}
              className="mb-2 break-inside-avoid list-none md:mb-3"
            >
              <button
                aria-label="open image"
                className="block w-full overflow-hidden rounded-lg p-0 text-left transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#dad3c1] dark:focus:ring-[#00444e]"
                type="button"
                onClick={() => {
                  setIsLightboxClosing(false);
                  setSelectedPicture(picture);
                }}
              >
                <Image
                  alt={picture.alt}
                  width={picture.width}
                  height={picture.height}
                  className="block h-auto w-full"
                  src={picture.src}
                  priority={i < 2}
                  sizes="(min-width: 768px) 220px, calc((100vw - 72px) / 2)"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedPicture && (
        <div
          aria-modal="true"
          className={
            "design-lightbox fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-amber-50/85 px-4 py-8 dark:bg-black/85" +
            (isLightboxClosing ? " design-lightbox--closing" : "")
          }
          role="dialog"
          onClick={closeLightbox}
        >
          <button
            aria-label="close image"
            className="absolute right-4 top-4 z-10 px-2 py-1 font-mono text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
            type="button"
            onClick={closeLightbox}
          >
            close
          </button>
          <div className="design-image-frame">
            <pre className="design-ascii-field" aria-hidden="true">
              {ASCII_FRAMES[asciiFrame]}
            </pre>
            <Image
              alt={selectedPicture.alt}
              className="design-lightbox-image max-h-[86vh] w-auto max-w-full object-contain"
              height={selectedPicture.height}
              width={selectedPicture.width}
              src={selectedPicture.src}
              sizes="100vw"
              priority
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Design;
