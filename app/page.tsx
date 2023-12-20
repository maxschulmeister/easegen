import Image from "next/image";
import easings from "@/app/lib/easegen";
import CubicBezierCard from "@/app/components/CubicBezierCard";
import Visualizer from "@/app/components/Visualizer";

export default function Home() {
  console.log(easings);
  return (
    <main className="px-32 py-16 space-y-16">
      <h1 className="text-black">Easings</h1>

      <div className="grid grid-cols-6 gap-32">
        {Object.keys(easings).map((easing, i) => {
          {
          }
          const curve = {
            x1: easings[easing][0],
            y1: easings[easing][1],
            x2: easings[easing][2],
            y2: easings[easing][3],
          };

          return (
            <div key={i}>
              <h3>{easing}</h3>
              {/* <p className="te">{JSON.stringify(curve)}</p> */}
              <Visualizer curve={curve} progress={0} />
            </div>
          );
        })}
      </div>
      <div>{/* <CubicBezierCard easingFunctions={easings} /> */}</div>
    </main>
  );
}
