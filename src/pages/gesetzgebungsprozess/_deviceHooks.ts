import { useEffect, useRef } from "react";

export function useResize(onResize: () => void, init = true) {
  const onResizeRef = useRef(onResize);

  // Update the ref when the callback changes
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (globalThis.window === undefined) return;

    const handleResize = () => {
      onResizeRef.current();
    };

    globalThis.window.addEventListener("resize", handleResize);
    if (init) handleResize(); // initialize

    return () => globalThis.window.removeEventListener("resize", handleResize);
  }, [init]);
}

export function useScroll(onScroll: () => void) {
  const onScrollRef = useRef(onScroll);

  // Update the ref when the callback changes
  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (globalThis.window === undefined) return;

    const handleScroll = () => {
      onScrollRef.current();
    };

    globalThis.window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => globalThis.window.removeEventListener("scroll", handleScroll);
  }, []);
}
