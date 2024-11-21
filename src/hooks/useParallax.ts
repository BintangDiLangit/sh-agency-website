import { useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

export function useParallax({
  speed = 0.5,
  direction = "up",
}: UseParallaxOptions = {}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const multiplier = direction === "up" ? -1 : 1;
      setOffset(scrolled * speed * multiplier);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return offset;
}
