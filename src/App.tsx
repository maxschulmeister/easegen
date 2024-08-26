import { motion } from "framer-motion";
import { useState } from "react";
import EasegenProvider, { useEasegen } from "./components/EasegenProvider";
import easegen from "./lib/easegen";

function AnimatedComponent({ easing }: { easing: number[] }) {
  return (
    <div className="flex gap-16">
      <div>
        <svg width="100%" height="100" viewBox="0 0 200 100" className="mb-4">
          <path
            d={`M0,100 C${easing[0] * 200},${100 - easing[1] * 100} ${
              easing[2] * 200
            },${100 - easing[3] * 100} 200,0`}
            fill="none"
            className="stroke-gray-600"
            strokeWidth="2"
          />

          {(easing[0] > 0 || easing[1] > 0) && (
            <>
              <circle
                cx={easing[0] * 200}
                cy={100 - easing[1] * 100}
                r="4"
                className="fill-gray-400"
              />
              <line
                x1="0"
                y1="100"
                x2={easing[0] * 200}
                y2={100 - easing[1] * 100}
                className="stroke-gray-400"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </>
          )}
          {(easing[2] > 0 || easing[3] > 0) && (
            <>
              <circle
                cx={easing[2] * 200}
                cy={100 - easing[3] * 100}
                r="4"
                className="fill-gray-500"
              />
              <line
                x1="200"
                y1="0"
                x2={easing[2] * 200}
                y2={100 - easing[3] * 100}
                className="stroke-gray-500"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </>
          )}
        </svg>
      </div>
      <motion.div className="bg-gray-100 rounded-xl p-8 items-center mb-4 w-full">
        <motion.div
          key={JSON.stringify(easing)}
          layout
          className="rounded-full h-8 w-8 bg-gray-800 ml-auto relative"
          animate={{ marginLeft: ["0", "calc(100% - 32px)"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            duration: 1,
            ease: easing,
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
}

function CurrentStateTab() {
  const { selectedEasing } = useEasegen();

  return (
    <div className="space-y-4">
      <AnimatedComponent easing={selectedEasing.array} />
    </div>
  );
}

function AllEasingsTab() {
  return (
    <div className="space-y-4">
      {Object.entries(easegen.array)
        .sort(([a], [b]) => b[0].localeCompare(a[0]))
        .map(([key, value]) => (
          <div key={key}>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{key}</h3>
            <AnimatedComponent easing={value} />
          </div>
        ))}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <EasegenProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Easegen</h1>

        <div className="mb-4 border-b border-gray-200">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "current"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("current")}
              >
                Selected Easing
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "all"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Easings
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === "current" && <CurrentStateTab />}
          {activeTab === "all" && <AllEasingsTab />}
        </div>
      </div>
    </EasegenProvider>
  );
}

export default App;
