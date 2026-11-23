import type { PointerEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

type SpotlightCardProps = {
  to: string;
  className?: string;
  children: ReactNode;
};

export default function SpotlightCard({ to, className = "", children }: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <Link
      to={to}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
    >
      {children}
    </Link>
  );
}
