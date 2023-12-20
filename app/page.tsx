import Image from 'next/image';
import easings from './components/easings';
import CubicBezierCard from './components/CubicBezierCard';

export default function Home() {
  console.log(easings);
  return (
    <main className="p-8">
      <h1>Easings</h1>
      <div>
        <CubicBezierCard easingFunctions={easings} />
      </div>
    </main>
  );
}
