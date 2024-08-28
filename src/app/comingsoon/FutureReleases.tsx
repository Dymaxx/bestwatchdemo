"use client";
import { WatchListItemDetails } from "@/components/Watch-Lists/WatchListItemDetails";
import { Movie } from "../../../types/movies";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TVShow } from "../../../types/tvShows";

export function FutureReleases({
  futureReleases,
  type,
}: {
  futureReleases: Movie[] | TVShow[];
  type: "movie" | "tvShow";
}) {
  const initialShowAmount = 4;
  const showMoreAmount = 2;
  const showLessAmount = 2;

  const [amountToShow, setAmountToShow] = useState(initialShowAmount);

  const handleShowLess = () => {
    if (amountToShow > initialShowAmount) {
      setAmountToShow(amountToShow - showLessAmount);
    }
  };

  const handleShowMoreOrClose = () => {
    if (amountToShow <= futureReleases.length) {
      setAmountToShow(amountToShow + showMoreAmount);
    } else {
      setAmountToShow(initialShowAmount);
    }
  };
  if (!futureReleases) return null;

  return (
    <div>
      {futureReleases && futureReleases.length !== 0 && (
        <div className="flex flex-col gap-4">
          <h1 className=" font-bold">
            {` New ${type === "movie" ? "movies" : "tv shows"} releases `}
          </h1>
          <div className="flex flex-col 2xl:grid grid-cols-2 gap-4">
            {futureReleases.slice(0, amountToShow).map((futureRelease) => (
              <WatchListItemDetails
                key={futureRelease.id}
                show={futureRelease}
                type={type}
                watchListId={0}
              />
            ))}
          </div>
          <div className="flex flex-row gap-4">
            {" "}
            {futureReleases.length > initialShowAmount &&
              amountToShow >= initialShowAmount && (
                <motion.div
                  onClick={() => handleShowMoreOrClose()}
                  className="px-2 py-2 w-18 rounded-lg flex text-center items-center justify-center text-md bg-primary text-white"
                  whileHover={{
                    backgroundColor: "#f00",
                    cursor: "pointer",
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {amountToShow < futureReleases.length ? "Show More" : "Close"}
                </motion.div>
              )}
            {amountToShow > initialShowAmount && (
              <motion.div
                onClick={() => handleShowLess()}
                className="px-2 py-2 w-18 rounded-lg flex text-center items-center justify-center text-md bg-primary text-white"
                whileHover={{
                  backgroundColor: "#f00",
                  cursor: "pointer",
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                Show Less
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
