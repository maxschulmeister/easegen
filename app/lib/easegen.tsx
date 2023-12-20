interface Point {
  x: number;
  y: number;
}

interface EasingObject {
  [key: string]: { default: number[]; css: string; string: string };
}

function generateCubicBezier(
  p1: Point,
  p2: Point
): { default: number[]; css: string; string: string } {
  const defaultFormat = [p1.x, p1.y, p2.x, p2.y] as number[];
  const cssFormat = `cubic-bezier(${p1.x},${p1.y},${p2.x},${p2.y})`;
  const stringFormat = `${p1.x},${p1.y},${p2.x},${p2.y}`;

  return { default: defaultFormat, css: cssFormat, string: stringFormat };
}

function subtractPoints(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

const values: Record<string, Point[]> = {
  short: [
    { x: 0.2, y: 0.4 },
    { x: 0.2, y: 0.333 },
    { x: 0.2, y: 0.1 },
  ],
  long: [
    { x: 0.6, y: 0 },
    { x: 0.666, y: 0 },
    { x: 0.8, y: 0 },
  ],
};

const defaults = {
  p1: { x: 0, y: 0 },
  p2: { x: 1, y: 1 },
};

const easings: EasingObject = {};

// Generate easings for "out" (p2 -> long)
for (let i = 0; i < values.long.length; i++) {
  const easingKey = `o${i + 1}`;
  easings[easingKey] = generateCubicBezier(
    defaults.p1,
    subtractPoints(defaults.p2, values.long[i])
  );
}

// Generate easings for "in" (p1 -> long)
for (let i = 0; i < values.long.length; i++) {
  const easingKey = `i${i + 1}`;
  easings[easingKey] = generateCubicBezier(values.long[i], defaults.p2);
}

// Generate easings for "inout" and "outin"
for (let i = 0; i < values.short.length; i++) {
  for (let j = 0; j < values.long.length; j++) {
    const easingKeyInOut = `o${i + 1}i${j + 1}`;
    const easingKeyOutIn = `i${j + 1}o${i + 1}`;

    easings[easingKeyInOut] = generateCubicBezier(
      values.short[i],
      subtractPoints(defaults.p2, values.long[j])
    );

    easings[easingKeyOutIn] = generateCubicBezier(
      values.long[j],
      subtractPoints(defaults.p2, values.short[i])
    );
  }
}

export default Object.fromEntries(
  Object.entries(easings).map(([key, value]) => [key, value.default])
);
export const css = Object.fromEntries(
  Object.entries(easings).map(([key, value]) => [key, value.css])
);
export const string = Object.fromEntries(
  Object.entries(easings).map(([key, value]) => [key, value.string])
);
