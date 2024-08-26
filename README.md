# easegen

A library for generating a set of cubic bezier easing functions by providing a min and max points and generating all possible combinations.

## Why is this useful?

It provides a set of easing functions that can be used in CSS and JavaScript. Getting multiple combinations of your desired min and max points gives you granular control over your animations.

## Usage

```ts
// import easegen with default values
import easings from "easegen";

// import Easegen class to use with your own values
import { Easegen } from "easegen";
export const easings = new Easegen(customValues);
```

### Custom values

We define different values for p1 and p2.
The library will generate all possible combinations of p1 and p2, including p1 and p2 as zero.
The more values you define, the more combinations you will get.

```ts
// default values
{
p1:  [
{ x:  0.2, y:  0.4  },
{ x:  0.2, y:  0.333  },
{ x:  0.2, y:  0.1  },
],
p2:  [
{ x:  0.6, y:  0  },
{ x:  0.666, y:  0  },
{ x:  0.8, y:  0  },
],
};
```

If you want to better understand how it works, you can clone the repo.

```
npm i

npm run dev

```

Will give you a nice overview of the easings.

### Choosing the best easing

For convenience, you can import EasegenProvider and useEasegen into your current app. This will render a select menu with all generated easings and lets you access the currently selected easing to test it on the animation you're currently working on.

```tsx
import { EasegenProvider, useEasegen } from "easegen";

const { currentEasing } = useEasegen();

<EasegenProvider>
  {/* ... Rest of you app or any component that needs the easing */}

  {/* css */}
  <div
    style={{
      transitionTimingFunction: currentEasing.css,
    }}
  >
    {/* ... */}
  </div>

  {/* framer-motion */}
  <motion.div
    animate={{ x: [0, 100] }}
    transition={{
      ease: currentEasing.array,
    }}
  ></motion.div>
</EasegenProvider>;
```

**‼️ Make sure to remove <EasingProvider> and all usage of _useEasegen_ in production to avoid unexpected results ‼️**
