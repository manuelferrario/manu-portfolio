import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ReducedMotionFlag = boolean | null | undefined;

export function fadeUp(reducedMotion: ReducedMotionFlag, distance = 10, delay = 0, duration = 0.45): Variants {
  const isReduced = Boolean(reducedMotion);

  return {
    hidden: {
      opacity: 0,
      y: isReduced ? 0 : distance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASE_OUT
      }
    }
  };
}

export function stagger(reducedMotion: ReducedMotionFlag, staggerChildren = 0.06, delayChildren = 0): Variants {
  const isReduced = Boolean(reducedMotion);

  return {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: isReduced
        ? { duration: 0.01 }
        : {
            staggerChildren,
            delayChildren
          }
    }
  };
}

export function cardIn(reducedMotion: ReducedMotionFlag, delay = 0): Variants {
  const isReduced = Boolean(reducedMotion);

  return {
    hidden: {
      opacity: 0,
      y: isReduced ? 0 : 12,
      scale: isReduced ? 1 : 0.995
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay,
        ease: EASE_OUT
      }
    }
  };
}

export function chipIn(reducedMotion: ReducedMotionFlag, delay = 0): Variants {
  const isReduced = Boolean(reducedMotion);

  return {
    hidden: {
      opacity: 0,
      y: isReduced ? 0 : 6,
      filter: isReduced ? "none" : "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.28,
        delay,
        ease: EASE_OUT
      }
    }
  };
}

export function imageReveal(reducedMotion: ReducedMotionFlag): Variants {
  const isReduced = Boolean(reducedMotion);

  return {
    hidden: {
      opacity: 0,
      filter: isReduced ? "none" : "blur(8px)",
      scale: isReduced ? 1 : 1.01
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.45,
        ease: EASE_OUT
      }
    }
  };
}
