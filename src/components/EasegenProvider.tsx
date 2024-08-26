import React, { createContext, useContext, useState } from "react";
import easegen from "../lib/easegen";

type SelectedEasing = {
  css: string;
  string: string;
  array: number[];
};

// Create a context for the selected easing
const EasingContext = createContext<{
  selectedEasing: SelectedEasing;
  setSelectedEasing: React.Dispatch<React.SetStateAction<SelectedEasing>>;
} | null>(null);

// Custom hook to use the easing context
export const useEasegen = () => {
  const context = useContext(EasingContext);
  if (!context) {
    throw new Error("useEasegen must be used within an EasegenProvider");
  }
  return context;
};

// Function to get easing values by key
const getEasingByKey = (key: string): SelectedEasing | undefined => {
  if (key in easegen.array) {
    return {
      css: easegen.css[key as keyof typeof easegen.css],
      string: easegen.string[key as keyof typeof easegen.string],
      array: easegen.array[key as keyof typeof easegen.array],
    };
  }
  return undefined;
};

const EasegenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedEasing, setSelectedEasing] = useState<SelectedEasing>(
    getEasingByKey(Object.keys(easegen.array)[0]) || {
      css: "",
      string: "",
      array: [],
    }
  );

  const easingOptions = Object.keys(easegen.array).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <EasingContext.Provider value={{ selectedEasing, setSelectedEasing }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <br />
        <label
          htmlFor="easing"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select easing
        </label>

        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="easing"
          value={JSON.stringify(selectedEasing)}
          onChange={(e) => setSelectedEasing(JSON.parse(e.target.value))}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        >
          {easingOptions.map((option) => (
            <option key={option} value={JSON.stringify(getEasingByKey(option))}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </EasingContext.Provider>
  );
};

export default EasegenProvider;
