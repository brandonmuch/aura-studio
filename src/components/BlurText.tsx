import { motion, useInView, useReducedMotion } from "motion/react";
import { useMemo, useRef } from "react";

/**
 * Aura's restrained adaptation of the React Bits BlurText reveal.
 * Source inspiration: DavidHDev/react-bits, BlurText (MIT + Commons Clause).
 * The animation is optional and respects the visitor's reduced-motion preference.
 */
type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export default function BlurText({ text, className = "", delay = 70 }: BlurTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.24 });
  const reduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className="blur-text-line">
        {words.map((word, index) => (
          <motion.span
            className="blur-text-word"
            key={`${word}-${index}`}
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 0.85, delay: reduceMotion ? 0 : index * (delay / 1000), ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
