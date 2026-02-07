import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Branch = {
  points: Point[];
  seed: number;
};

const GLYPH_SPRIG = ["/", "\\", "|", "v", "^"];

export default function AsciiRain() {
  const preRef = useRef<HTMLPreElement | null>(null);
  const branchesRef = useRef<Branch[]>([]);
  const metricsRef = useRef({
    cols: 0,
    rows: 0,
    charWidth: 0,
    lineHeight: 0,
  });

  useEffect(() => {
    const el = preRef.current;
    if (!el) {
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const measure = () => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseFloat(styles.fontSize || "14");
      const lineHeight = parseFloat(styles.lineHeight || `${fontSize}`);
      const charWidth = fontSize * 0.6;
      const width = el.clientWidth;
      const height = el.clientHeight;
      const cols = Math.max(1, Math.floor(width / charWidth));
      const rows = Math.max(1, Math.floor(height / lineHeight));
      const metrics = metricsRef.current;
      const resized = cols !== metrics.cols || rows !== metrics.rows;
      metrics.cols = cols;
      metrics.rows = rows;
      metrics.charWidth = charWidth;
      metrics.lineHeight = lineHeight;
      return resized;
    };

    const makeBranch = (cols: number, rows: number) => {
      const points: Point[] = [];
      const seed = Math.random() * Math.PI * 2;
      let x = Math.random() * cols * 0.9;
      let y = Math.random() * rows;
      const length = 18 + Math.floor(Math.random() * 45);
      const drift = (Math.random() - 0.5) * 0.5;
      const rise = (Math.random() - 0.5) * 0.8;

      for (let i = 0; i < length; i += 1) {
        points.push({ x, y });
        x += 0.35 + Math.random() * 0.6 + drift;
        y += rise + (Math.random() - 0.5) * 0.9;
        if (x < 0 || x >= cols || y < 0 || y >= rows) {
          break;
        }
      }

      return { points, seed };
    };

    const initBranches = () => {
      const { cols, rows } = metricsRef.current;
      const count = Math.max(12, Math.floor(cols / 2.8));
      branchesRef.current = Array.from({ length: count }, () =>
        makeBranch(cols, rows)
      );
    };

    const glyphFor = (dx: number, dy: number) => {
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (ady < 0.2) {
        return "-";
      }
      if (adx < 0.2) {
        return "|";
      }
      return dy < 0 ? "/" : "\\";
    };

    const drawFrame = (time: number) => {
      const { cols, rows } = metricsRef.current;
      const grid: string[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => " ")
      );
      const branches = branchesRef.current;

      for (const branch of branches) {
        const sway = Math.sin(time * 0.0007 + branch.seed) * 0.7;
        for (let i = 0; i < branch.points.length; i += 1) {
          const point = branch.points[i];
          const prev = branch.points[Math.max(0, i - 1)];
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;
          const offset = sway + Math.sin(point.y * 0.35 + branch.seed) * 0.4;
          const x = Math.round(point.x + offset);
          const y = Math.round(point.y);
          if (x < 0 || x >= cols || y < 0 || y >= rows) {
            continue;
          }
          const glyph = glyphFor(dx, dy);
          grid[y][x] = glyph;
          if (i % 8 === 0 && x + 1 < cols) {
            grid[y][x + 1] = GLYPH_SPRIG[i % GLYPH_SPRIG.length];
          }
        }
      }

      el.textContent = grid.map((row) => row.join("")).join("\n");
    };

    let lastTime = 0;
    const frameInterval = 1000 / 22;
    let raf = 0;

    const animate = (time: number) => {
      if (measure()) {
        initBranches();
      }
      if (time - lastTime >= frameInterval) {
        lastTime = time;
        drawFrame(time);
      }
      raf = window.requestAnimationFrame(animate);
    };

    measure();
    initBranches();

    if (prefersReduced) {
      drawFrame(performance.now());
    } else {
      raf = window.requestAnimationFrame(animate);
    }

    const onResize = () => {
      measure();
      initBranches();
      if (prefersReduced) {
        drawFrame(performance.now());
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ascii-rain" aria-hidden="true">
      <pre ref={preRef} className="ascii-rain__pre" />
    </div>
  );
}
