import { useEffect } from "react";

export default function BootScreen({ onDone }) {
  useEffect(() => {
    const el = document.getElementById("boot");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 80 : 950;
    const fade = reduce ? 0 : 480;

    if (!el) {
      onDone();
      return undefined;
    }

    const hide = window.setTimeout(() => {
      el.classList.add("is-done");
      window.setTimeout(() => {
        el.remove();
        onDone();
      }, fade);
    }, hold);

    return () => window.clearTimeout(hide);
  }, [onDone]);

  return null;
}
