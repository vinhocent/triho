import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";

function makeAscii(cols: number, rows: number, t: number) {
  let out = "";
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const wave =
        Math.sin(x * 0.35 + t * 1.2) +
        Math.sin(y * 0.25 + t * 1.6) +
        Math.sin((x + y) * 0.15 + t * 0.9);
      const norm = (wave + 3) / 6;
      const idx = Math.min(
        CHARS.length - 1,
        Math.max(0, Math.floor(norm * CHARS.length))
      );
      out += CHARS[idx];
    }
    out += "\n";
  }
  return out;
}

export default function AsciiCursor() {
  const preRef = useRef<HTMLPreElement | null>(null);
  const cacheRef = useRef<{
    cols: number;
    rows: number;
    fps: number;
    totalFrames: number;
    frames: Map<number, string>;
  }>({
    cols: 0,
    rows: 0,
    fps: 45,
    totalFrames: 120,
    frames: new Map(),
  });

  useEffect(() => {
    const el = preRef.current;
    if (!el) {
      return;
    }

    const measure = (time: number) => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseFloat(styles.fontSize || "16");
      const lineHeight = parseFloat(styles.lineHeight || `${fontSize}`);
      const charWidth = fontSize * 0.6;
      const cols = Math.ceil(window.innerWidth / charWidth) + 2;
      const rows = Math.ceil(window.innerHeight / lineHeight) + 2;
      const cache = cacheRef.current;
      if (cache.cols !== cols || cache.rows !== rows) {
        cache.cols = cols;
        cache.rows = rows;
        cache.frames.clear();
      }

      const tSeconds = time / 1000;
      const frameIndex =
        Math.floor(tSeconds * cache.fps) % cache.totalFrames;
      let frame = cache.frames.get(frameIndex);
      if (!frame) {
        frame = makeAscii(cols, rows, frameIndex / cache.fps);
        cache.frames.set(frameIndex, frame);
      }
      el.textContent = frame;
    };

    measure(0);

    let hideTimer: number | null = null;
    let refreshTimer: number | null = null;
    const show = (event: PointerEvent) => {
      el.style.setProperty("--ascii-x", `${event.clientX}px`);
      el.style.setProperty("--ascii-y", `${event.clientY}px`);
      el.classList.add("ascii-overlay--active");
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      hideTimer = window.setTimeout(() => {
        el.classList.remove("ascii-overlay--active");
        if (refreshTimer) {
          window.clearInterval(refreshTimer);
          refreshTimer = null;
        }
      }, 800);
      if (!refreshTimer) {
        refreshTimer = window.setInterval(() => {
          measure(performance.now());
        }, 140);
      }
    };
    const onResize = () => {
      cacheRef.current.frames.clear();
      measure(performance.now());
    };

    window.addEventListener("pointermove", show, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", show);
      window.removeEventListener("resize", onResize);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      if (refreshTimer) {
        window.clearInterval(refreshTimer);
      }
    };
  }, []);

  return (
    <pre
      className="ascii-overlay"
      ref={preRef}
      aria-hidden="true"
    />
  );
}
