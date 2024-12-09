"use client";

import { motion, useAnimate } from "motion/react";
import { buttonVariants } from "../ui/button";

interface EmojiButtonProps {
  emoji: string;

  label: string;
}

const EmojiButton = ({ emoji, label }: EmojiButtonProps) => {
  const [scope, animate] = useAnimate();

  const handleAnimate = async () => {
    animate("#emoji-button-label", { x: 200 });
    animate("#emoji-button-emoji", { x: 0 });
  };

  const handleAnimateEnd = async () => {
    animate("#emoji-button-label", { x: 0 });
    animate("#emoji-button-emoji", { x: -200 });
  };

  return (
    <>
      <motion.button
        className={`${buttonVariants({})} overflow-hidden relative `}
        type="submit"
        onHoverStart={handleAnimate}
        onHoverEnd={handleAnimateEnd}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        ref={scope}
      >
        <div id="emoji-button-label" className="text-sm">
          {label}
        </div>
        <motion.div
          id="emoji-button-emoji"
          className="text-xl absolute"
          initial={{
            x: -200,
          }}
        >
          {emoji}
        </motion.div>
      </motion.button>
    </>
  );
};

export default EmojiButton;
