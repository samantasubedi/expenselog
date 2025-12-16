"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/preview1.jpeg",
    title: "Sign in preview",
  },
  {
    image: "/preview2.jpeg",
    title: "Add expenses preview",
  },
  {
    image: "/preview3.jpeg",
    title: "Track and visulaize preview",
  },
];

export default function PreviewCarousel() {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-6">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1000}
                height={560}
                className="rounded-xl border"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
