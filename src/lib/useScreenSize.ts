"use client";
import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial screen size
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const checkBreakpoint = () => {
      let currentBreakpoint = "";

      switch (true) {
        case screenSize.width >= 1536:
          currentBreakpoint = "2xl";
          break;
        case screenSize.width >= 1280:
          currentBreakpoint = "xl";
          break;
        case screenSize.width >= 1024:
          currentBreakpoint = "lg";
          break;
        case screenSize.width >= 768:
          currentBreakpoint = "md";
          break;
        case screenSize.width >= 640:
          currentBreakpoint = "sm";
          break;
        default:
          currentBreakpoint = "xs";
      }

      setBreakpoint(currentBreakpoint);
    };

    checkBreakpoint();
  }, [screenSize.width]);

  return breakpoint;
};

export default useScreenSize;
