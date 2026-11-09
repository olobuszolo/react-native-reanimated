import type { ComponentType } from 'react';

import Basics from './01-basics';
import Timing from './02-timing-sequence';
import Drag from './03-drag-gesture';

export type Example = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType;
};

// Dodając nowe ćwiczenie: utwórz plik w src/examples i dopisz go tutaj.
export const examples: Example[] = [
  {
    id: 'basics',
    title: '1. Podstawy',
    description: 'useSharedValue, useAnimatedStyle, withSpring',
    Component: Basics,
  },
  {
    id: 'timing',
    title: '2. Timing i sekwencje',
    description: 'withTiming, withSequence, withRepeat, withDelay, Easing',
    Component: Timing,
  },
  {
    id: 'drag',
    title: '3. Przeciąganie',
    description: 'Gesture Handler (Pan) + Reanimated',
    Component: Drag,
  },
];
