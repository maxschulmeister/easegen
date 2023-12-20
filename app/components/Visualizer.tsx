"use client";

import BezierEasing from "bezier-easing";
import { motion } from "framer-motion";

interface CubicBezierCurveProps {
  curve: { x1: number; y1: number; x2: number; y2: number };
  style?: React.CSSProperties;
  progress: number;
}

const BALL_RADIUS: number = 24;

const Visualizer: React.FC<CubicBezierCurveProps> = ({
  curve,
  style,
  progress,
}) => {
  const { x1, y1, x2, y2 } = curve;
  const currentY = BezierEasing(x1, y1, x2, y2)(progress);
  const path = `M 0 0 C ${x1 * 1000} ${y1 * 1000}, ${x2 * 1000} ${
    y2 * 1000
  }, 1000 1000`;

  return (
    <div
      className="p-4 transform border bg-gray-50 border-gray-200 rounded-lg"
      style={style}
    >
      <svg
        viewBox={`-${BALL_RADIUS} -${BALL_RADIUS} ${1000 + BALL_RADIUS * 2} ${
          1000 + BALL_RADIUS * 2
        }`}
        width="100%"
      >
        <g className="text-gray-700">
          <motion.path
            initial={{
              d: path,
            }}
            animate={{
              d: path,
            }}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            transform="scale(1, -1) translate(0, -1000)"
          />
        </g>
        {/* <g
          className="text-gray-700"
          transform={`translate(${progress * 1000}, ${currentY * 1000})`}
        >
          <circle r={BALL_RADIUS} fill="currentColor" />
        </g> */}
      </svg>
    </div>
  );
};

export default Visualizer;
