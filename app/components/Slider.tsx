import { useEffect, useRef } from "react";
import Image from "next/image";
import { Video } from "../types/Video";

type MovingSliderProps = {
  videos: Video[];
};

function cloneSlides(slider: HTMLDivElement, slidesPerView: number) {
  const numSlides = slider.children.length;
  const firstSlides = [];
  const lastSlides = [];

  for (let i = 0; i < slidesPerView; i++) {
    firstSlides.push(slider.children[i].cloneNode(true));
    lastSlides.push(slider.children[numSlides - 1 - i].cloneNode(true));
  }

  firstSlides.forEach((slide) => slider.appendChild(slide));
  lastSlides
    .reverse()
    .forEach((slide) => slider.insertBefore(slide, slider.firstChild));
}

function startAutoScroll(
  slider: HTMLDivElement,
  slideWidth: number,
  slidesPerView: number
) {
  let startPos = slideWidth * slidesPerView;
  slider.scrollTo({ left: startPos, behavior: "auto" });

  const scroll = () => {
    startPos += 1; // Adjust this value for speed
    slider.scrollTo({ left: startPos, behavior: "smooth" });

    if (startPos >= slideWidth * (slider.children.length - slidesPerView)) {
      startPos = slideWidth * slidesPerView;
      slider.scrollTo({ left: startPos, behavior: "auto" });
    }
  };

  return setInterval(scroll, 30); // Adjust this value for smoothness and speed
}

export default function MovingSlider({ videos }: MovingSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const SLIDES_PER_VIEW = 5;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideWidth = slider.clientWidth / SLIDES_PER_VIEW;
    cloneSlides(slider, SLIDES_PER_VIEW);
    const intervalId = startAutoScroll(slider, slideWidth, SLIDES_PER_VIEW);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden w-screen mx-auto">
      <div
        className="flex gap-4 overflow-x-hidden scroll-smooth w-full"
        ref={sliderRef}
      >
        {videos.map(({ id: { videoId }, snippet: { title, thumbnails } }) => (
          <div
            key={videoId}
            className="slide flex justify-center items-center text-2xl text-white"
          >
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              className="h-full flex flex-col items-between justify-start"
            >
              <Image
                src={thumbnails.high.url}
                alt={title}
                width={320}
                height={180}
              />
              <h3 className="text-lg">{title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
