import type { ComponentType } from 'react';

import SolarSystemScreen from './SolarSystemScreen';
import CircleLineScreen from './CircleLineScreen';
import BouncingBallScreen from './BouncingBallScreen';

type Screen = {
  key: string;
  Component: ComponentType;
};

export const screens: Screen[] = [
  { key: 'solar-system', Component: SolarSystemScreen },
  { key: 'circle-line', Component: CircleLineScreen },
  { key: 'bouncing-ball', Component: BouncingBallScreen },
];
