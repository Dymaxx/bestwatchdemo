"use client";

import { useEffect, useState } from "react";
import { GenreCardCopy } from "./genreCardShow";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { AnimatedCards } from "./ui/Animated-cards";
import useScreenSize from "@/lib/useScreenSize";
import { log } from "console";
export function Categories({
  showsByCategory,
  media,
}: {
  category: any;
  showsByCategory: any;
  media: string;
}) {
  const screensize = useScreenSize();
  const [initialShowCount, setInitialShowCount] = useState(8);
  const [viewCount, setViewCount] = useState(8);
  const [itemsToShow, setItemsToShow] = useState(
    showsByCategory && showsByCategory.map(() => initialShowCount)
  );

  const mediaType = media + "s";
  useEffect(() => {
    console.log(screensize);
    switch (true) {
      case screensize == "sm" || screensize == "xs":
        setItemsToShow(showsByCategory.map(() => 4));
        setInitialShowCount(4);
        setViewCount(4);
        break;
      case screensize == "md" || screensize == "lg":
        setItemsToShow(showsByCategory.map(() => 4));
        setInitialShowCount(4);
        setViewCount(4);
      case screensize == "2xl" || screensize == "xl":
        setItemsToShow(showsByCategory.map(() => 8));
        setInitialShowCount(8);
        setViewCount(8);
        break;
    }
  }, [initialShowCount, screensize, showsByCategory]);

  const handleShowMoreOrClose = (index: number) => {
    setItemsToShow((prevItemsToShow: any[]) =>
      prevItemsToShow.map((count, i) =>
        i === index
          ? count >= showsByCategory[index][mediaType].length
            ? initialShowCount
            : count + viewCount
          : count
      )
    );
  };

  const handleShowLess = (index: number) => {
    setItemsToShow((prevItemsToShow: any[]) =>
      prevItemsToShow.map((count, i) =>
        i === index ? Math.max(count - viewCount, initialShowCount) : count
      )
    );
  };

  return (
    <div className="gap-10 flex flex-col">
      {showsByCategory &&
        showsByCategory.map((genre: any, index: number) => (
          <div className="flex flex-col gap-4" key={index}>
            <h3 className="text-2xl">{genre.genre}</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4">
              {genre[mediaType]
                .slice(0, itemsToShow[index])
                .map((show: any, index: number) => (
                  <div className="" key={index}>
                    <AnimatedCards>
                      <GenreCardCopy recomendedShow={show} type={media} />
                    </AnimatedCards>
                  </div>
                ))}
            </div>
            {/* Show more button */}
            <div className="flex flex-row gap-4">
              {genre[mediaType].length >= initialShowCount && (
                <motion.div
                  onClick={() => handleShowMoreOrClose(index)}
                  className="px-2 py-2 w-18 rounded-lg flex text-center items-center justify-center text-md bg-primary text-white"
                  whileHover={{
                    backgroundColor: "#f00",
                    cursor: "pointer",
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {itemsToShow[index] >= genre[mediaType].length
                    ? "Close"
                    : "Show More"}
                </motion.div>
              )}
              {/* Show less button */}
              {itemsToShow[index] > initialShowCount && (
                <motion.div
                  onClick={() => handleShowLess(index)}
                  className="px-2 py-2 w-18 rounded-lg flex text-center items-center justify-center text-md bg-primary text-white"
                  whileHover={{
                    backgroundColor: "#f00",
                    cursor: "pointer",
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  Show Less
                </motion.div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
