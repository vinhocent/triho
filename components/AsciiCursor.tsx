import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";
const LOOP_PERIOD = Math.PI * 2;
const TIME_SCALE = 0.65;

function makeAsciiWindow(
  cols: number,
  rows: number,
  t: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number
) {
  if (cols <= 0 || rows <= 0) {
    return "";
  }
  const startY = Math.max(0, cy - ry);
  const endY = Math.min(rows - 1, cy + ry);
  const startX = Math.max(0, cx - rx);
  const endX = Math.min(cols - 1, cx + rx);
  const blankRow = " ".repeat(cols);
  const leftPad = startX > 0 ? " ".repeat(startX) : "";
  const rightPad =
    endX < cols - 1 ? " ".repeat(cols - 1 - endX) : "";
  let out = "";
  for (let y = 0; y < rows; y += 1) {
    if (y < startY || y > endY) {
      out += blankRow + "\n";
      continue;
    }
    if (leftPad) {
      out += leftPad;
    }
    for (let x = startX; x <= endX; x += 1) {
      const wave =
        Math.sin(x * 0.35 + t * 1) +
        Math.sin(y * 0.25 + t * 2) +
        Math.sin((x + y) * 0.15 + t * 3);
      const norm = (wave + 3) / 6;
      const idx = Math.min(
        CHARS.length - 1,
        Math.max(0, Math.floor(norm * CHARS.length))
      );
      out += CHARS[idx];
    }
    if (rightPad) {
      out += rightPad;
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
    charWidth: number;
    lineHeight: number;
    fps: number;
    totalFrames: number;
    frames: Map<string, string>;
    frameKeys: string[];
    maxFrames: number;
  }>({
    cols: 0,
    rows: 0,
    charWidth: 0,
    lineHeight: 0,
    fps: 36,
    totalFrames: 120,
    frames: new Map(),
    frameKeys: [],
    maxFrames: 80,
  });
  const cursorRef = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
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
        cache.frameKeys = [];
      }
      cache.charWidth = charWidth;
      cache.lineHeight = lineHeight;

      const tSeconds = (time / 1000) * TIME_SCALE;
      const frameIndex =
        Math.floor(tSeconds * cache.fps) % cache.totalFrames;
      const radiusPx = 500;
      const rx = Math.max(1, Math.ceil(radiusPx / charWidth));
      const ry = Math.max(1, Math.ceil(radiusPx / lineHeight));
      const cursor = cursorRef.current;
      const cx = Math.min(cols - 1, Math.max(0, cursor.x));
      const cy = Math.min(rows - 1, Math.max(0, cursor.y));
      const key = `${frameIndex}:${cx}:${cy}:${rx}:${ry}`;
      let frame = cache.frames.get(key);
      if (!frame) {
        const denom = Math.max(1, cache.totalFrames);
        const loopT = (frameIndex / denom) * LOOP_PERIOD;
        frame = makeAsciiWindow(cols, rows, loopT, cx, cy, rx, ry);
        cache.frames.set(key, frame);
        cache.frameKeys.push(key);
        if (cache.frameKeys.length > cache.maxFrames) {
          const oldest = cache.frameKeys.shift();
          if (oldest) {
            cache.frames.delete(oldest);
          }
        }
      }
      el.textContent = frame;
    };

    measure(0);

    let hideTimer: number | null = null;
    let refreshTimer: number | null = null;
    const show = (event: PointerEvent) => {
      const cache = cacheRef.current;
      if (cache.charWidth > 0 && cache.lineHeight > 0) {
        cursorRef.current.x = Math.floor(event.clientX / cache.charWidth);
        cursorRef.current.y = Math.floor(event.clientY / cache.lineHeight);
      }
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
      cacheRef.current.frameKeys = [];
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

  return <pre className="ascii-overlay" ref={preRef} aria-hidden="true" />;
}
