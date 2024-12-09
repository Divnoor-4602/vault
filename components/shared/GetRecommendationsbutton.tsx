"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { buttonVariants } from "../ui/button";

const GetRecommendationsbutton = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {" "}
      <motion.button
        className={`${buttonVariants({})} w-fit max-sm:self-end`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.97,
        }}
      >
        Get recommendations ✨
      </motion.button>
      <motion.p
        className="absolute md:-right-16 sm:right-28 sm:-top-12 md:top-0 sm:text-4xl text-2xl pointer-events-none -top-12 right-0 "
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateX: isHovered ? 0 : -30,
        }}
      >
        📚
      </motion.p>
      <motion.p
        className="absolute md:-right-10 sm:right-16 -top-12 right-20 sm:text-4xl text-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : -20,
        }}
      >
        😙
      </motion.p>
      <motion.p
        className="absolute md:-right-10 sm:right-16 sm:top-12 sm:text-4xl text-2xl pointer-events-none top-12 right-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : 20,
        }}
      >
        🥸
      </motion.p>
      <motion.p
        className="absolute sm:right-52 sm:top-0 sm:text-4xl text-2xl pointer-events-none top-12 right-40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : -20,
        }}
      >
        📙
      </motion.p>
      <motion.p
        className="absolute sm:right-44 sm:-top-12 sm:text-4xl text-2xl pointer-events-none -top-12 right-40"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateX: isHovered ? 0 : 20,
        }}
      >
        🤖
      </motion.p>
      <motion.p
        className="absolute sm:right-44 sm:top-12 sm:text-4xl text-2xl pointer-events-none top-12 right-20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : 20,
        }}
      >
        👾
      </motion.p>
    </>
  );
};

export default GetRecommendationsbutton;
