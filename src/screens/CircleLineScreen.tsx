import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedProps,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const POINTS = 120;
const SVG_HEIGHT = 300;
const CYCLE_DURATION_MS = 2500;
const STRAIGHT_EPSILON = 1e-4;

function pointOnCurve(s: number, curvature: number) {
  'worklet';
  if (curvature < STRAIGHT_EPSILON) {
    return { x: s, y: 0 };
  }
  const angle = s * curvature;
  return {
    x: Math.sin(angle) / curvature,
    y: -(1 - Math.cos(angle)) / curvature,
  };
}

export default function CircleLineScreen() {
  const { width } = useWindowDimensions();

  const progress = useSharedValue(0);
  const direction = useSharedValue(1);

  useFrameCallback((frameInfo) => {
    'worklet';
    const delta = frameInfo.timeSincePreviousFrame ?? 0;
    let next = progress.value + (direction.value * delta) / CYCLE_DURATION_MS;

    if (next >= 1) {
      next = 1;
      direction.value = -1;
    } else if (next <= 0) {
      next = 0;
      direction.value = 1;
    }

    progress.value = next;
  });

  const animatedProps = useAnimatedProps(() => {
    const p = progress.value;
    const eased = p * p * (3 - 2 * p);
    const curvature = (1 - eased) / RADIUS;

    const anchorX = width / 2;
    const anchorY = SVG_HEIGHT / 2 + RADIUS;

    let d = '';
    for (let i = 0; i <= POINTS; i++) {
      const s = (i / POINTS - 0.5) * CIRCUMFERENCE;
      const point = pointOnCurve(s, curvature);
      d += `${i === 0 ? 'M' : 'L'}${(anchorX + point.x).toFixed(2)} ${(anchorY + point.y).toFixed(2)} `;
    }

    return { d };
  });

  return (
    <View style={styles.container}>
      <Svg width={width} height={SVG_HEIGHT}>
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="#4fa3f7"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
