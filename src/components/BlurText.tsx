import { motion, useInView, useReducedMotion } from "motion/react";
import { useMemo, useRef } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

type Word = { word: string; index: number };

export default function BlurText({ text, className = "", delay = 70 }: BlurTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.24 });
  const reduceMotion = useReducedMotion();

  const lines = useMemo(() => {
    let index = 0;
    return text.split("\n").map((line) =>
      line.split(" ").filter(Boolean).map((word): Word => ({ word, index: index++ }))
    );
  }, [text]);

  const accessibleText = useMemo(() => text.replace(/\s*\n\s*/g, " ").trim(), [text]);
  const entranceDelays = [0, 45, 80, 110];

  return (
    <h1 ref={ref} className={className} aria-label={accessibleText}>
      <span className="visually-hidden">{accessibleText}</span>
      <span aria-hidden="true" className="blur-text-lines">
        {lines.map((line, lineIndex) => (
          <span className="blur-text-line" key={`line-${lineIndex}`}>
            {line.map(({ word, index }) => (
              <motion.span
                className="blur-text-word"
                key={`${word}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion || inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : (entranceDelays[index] ?? index * delay) / 1000,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {word}
                {"\u00a0"}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
