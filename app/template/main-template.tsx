"use client";

import { useRef } from "react";
import Slider from "../components/Slider";
import { Video } from "../types/Video";

export default function MainTemplate({ videos }: { videos: Video[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView();
}
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-between p-0 md:p-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-7xl md:text-9xl">learn vipassana</h1>
          <p className="w-full">
            Vipassana, which means to see things as they really are, is one of
            India&apos;s most ancient techniques of meditation. It was
            rediscovered by Gotama Buddha more than 2500 years ago and was
            taught by him as a universal remedy for universal ills, i.e., an Art
            Of Living. This non-sectarian technique aims for the total
            eradication of mental impurities and the resultant highest happiness
            of full liberation. Vipassana is a way of self-transformation
            through self-observation.
          </p>
          <p>
            It focuses on the deep interconnection between mind and body, which
            can be experienced directly by disciplined attention to the physical
            sensations that form the life of the body, and that continuously
            interconnect and condition the life of the mind. It is this
            observation-based, self-exploratory journey to the common root of
            mind and body that dissolves mental impurity, resulting in a
            balanced mind full of love and compassion. The scientific laws that
            operate one&apos;s thoughts, feelings, judgements and sensations
            become clear. Through direct experience, the nature of how one grows
            or regresses, how one produces suffering or frees oneself from
            suffering is understood. Life becomes characterized by increased
            awareness, non-delusion, self-control and peace.
          </p>
          <p>
            To learn more about Vipassana, visit{" "}
            <a
              href="https://www.dhamma.org/en/about/vipassana"
              className="underline"
            >
              here
            </a>
          </p>
        </div>
        <button
          className="p-4 border border-white hover:bg-white hover:text-black"
          onClick={scrollToSection}
        >
          let&apos;s practice ↓
        </button>     
      </section>
      <section
        className="flex min-h-screen items-center justify-center overflow-hidden"
        ref={sectionRef}
      >
        <Slider videos={videos} />
      </section>
    </main>
  );
}
