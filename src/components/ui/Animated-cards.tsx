import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedCards({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className=" rounded-lg flex text-center items-center justify-center text-md "
      whileHover={{
        cursor: "pointer",
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
