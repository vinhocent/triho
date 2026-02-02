import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const preRef = useRef<HTMLPreElement | null>(null);

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
      el.textContent = makeAscii(cols, rows, time / 1000);
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
      }, 800);
      if (!refreshTimer) {
        refreshTimer = window.setInterval(() => {
          measure(performance.now());
        }, 220);
      }
    };
    const onResize = () => {
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
      style={{
        color: resolvedTheme === "dark" ? "aqua" : "coral",
      }}
    />
  );
}
