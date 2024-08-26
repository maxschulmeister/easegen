interface Point {
  x: number;
  y: number;
}

interface EasingObject {
  [key: string]: { default: number[]; css: string; string: string };
}

interface Values {
  p1: Point[];
  p2: Point[];
}

class Easegen {
  private easings: EasingObject = {};
  public array: { [key: string]: number[] } = {};
  public css: { [key: string]: string } = {};
  public string: { [key: string]: string } = {};

  constructor(customValues?: Values) {
    const values: Values = customValues || {
      p1: [
        { x: 0.2, y: 0.4 },
        { x: 0.2, y: 0.333 },
        { x: 0.2, y: 0.1 },
      ],
      p2: [
        { x: 0.6, y: 0 },
        { x: 0.666, y: 0 },
        { x: 0.8, y: 0 },
      ],
    };

    const defaults = {
      p1: { x: 0, y: 0 },
      p2: { x: 1, y: 1 },
    };

    this.generateEasings(values, defaults);
    this.generateExports();
  }

  private generateCubicBezier(
    p1: Point,
    p2: Point
  ): { default: number[]; css: string; string: string } {
    const defaultFormat = [p1.x, p1.y, p2.x, p2.y] as number[];
    const cssFormat = `cubic-bezier(${p1.x},${p1.y},${p2.x},${p2.y})`;
    const stringFormat = `${p1.x},${p1.y},${p2.x},${p2.y}`;

    return { default: defaultFormat, css: cssFormat, string: stringFormat };
  }

  private subtractPoints(p1: Point, p2: Point): Point {
    return { x: p1.x - p2.x, y: p1.y - p2.y };
  }

  private generateEasings(values: Values, defaults: { p1: Point; p2: Point }) {
    // Generate easings for "out" (p2 -> p2)
    for (let i = 0; i < values.p2.length; i++) {
      const easingKey = `o${i + 1}`;
      this.easings[easingKey] = this.generateCubicBezier(
        defaults.p1,
        this.subtractPoints(defaults.p2, values.p2[i])
      );
    }

    // Generate easings for "in" (p1 -> p2)
    for (let i = 0; i < values.p2.length; i++) {
      const easingKey = `i${i + 1}`;
      this.easings[easingKey] = this.generateCubicBezier(
        values.p2[i],
        defaults.p2
      );
    }

    // Generate easings for "inout" and "outin"
    for (let i = 0; i < values.p1.length; i++) {
      for (let j = 0; j < values.p2.length; j++) {
        const easingKeyInOut = `o${i + 1}i${j + 1}`;
        const easingKeyOutIn = `i${j + 1}o${i + 1}`;

        this.easings[easingKeyInOut] = this.generateCubicBezier(
          values.p1[i],
          this.subtractPoints(defaults.p2, values.p2[j])
        );

        this.easings[easingKeyOutIn] = this.generateCubicBezier(
          values.p2[j],
          this.subtractPoints(defaults.p2, values.p1[i])
        );
      }
    }
  }

  private generateExports() {
    this.css = Object.fromEntries(
      Object.entries(this.easings).map(([key, value]) => [key, value.css])
    );

    this.string = Object.fromEntries(
      Object.entries(this.easings).map(([key, value]) => [key, value.string])
    );

    this.array = Object.fromEntries(
      Object.entries(this.easings).map(([key, value]) => [key, value.default])
    );
  }
}

const defaultEasings = new Easegen();

export { Easegen };
export default defaultEasings;
