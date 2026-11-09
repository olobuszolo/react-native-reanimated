import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

export const BOX_WIDTH = 300;
export const BOX_HEIGHT = 400;
const BORDER_WIDTH = 2;

const BALL_SIZE = 40;
const MAX_X = BOX_WIDTH - BALL_SIZE;
const MAX_Y = BOX_HEIGHT - BALL_SIZE;
const MAX_FRAME_DELTA = 0.05;
const FRICTION = 1.2;
const STOP_SPEED = 8;
const MAX_SPEED = 2500;

export function isInsideBox(x: number, y: number, size = 0) {
  'worklet';
  return (
    x >= 0 && y >= 0 && x + size <= BOX_WIDTH && y + size <= BOX_HEIGHT
  );
}

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

export function Box({ children }: { children?: ReactNode }) {
  return <View style={styles.box}>{children}</View>;
}

export default function BallInBoxScreen() {
  const x = useSharedValue(MAX_X / 2);
  const y = useSharedValue(MAX_Y / 2);
  const vx = useSharedValue(0);
  const vy = useSharedValue(0);

  const isDragging = useSharedValue(false);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = usePanGesture({
    onActivate: () => {
      'worklet';
      isDragging.value = true;
      startX.value = x.value;
      startY.value = y.value;
      vx.value = 0;
      vy.value = 0;
    },
    onUpdate: (event) => {
      'worklet';
      x.value = clamp(startX.value + event.translationX, 0, MAX_X);
      y.value = clamp(startY.value + event.translationY, 0, MAX_Y);
    },
    onDeactivate: (event) => {
      'worklet';
      vx.value = clamp(event.velocityX, -MAX_SPEED, MAX_SPEED);
      vy.value = clamp(event.velocityY, -MAX_SPEED, MAX_SPEED);
    },
    onFinalize: () => {
      'worklet';
      isDragging.value = false;
    },
  });

  useFrameCallback((frameInfo) => {
    'worklet';
    if (isDragging.value) {
      return;
    }

    const delta = Math.min(
      (frameInfo.timeSincePreviousFrame ?? 0) / 1000,
      MAX_FRAME_DELTA,
    );

    let nextVx = vx.value;
    let nextVy = vy.value;
    let nextX = x.value + nextVx * delta;
    let nextY = y.value + nextVy * delta;

    if (nextX <= 0) {
      nextX = 0;
      nextVx = Math.abs(nextVx);
    } else if (nextX >= MAX_X) {
      nextX = MAX_X;
      nextVx = -Math.abs(nextVx);
    }

    if (nextY <= 0) {
      nextY = 0;
      nextVy = Math.abs(nextVy);
    } else if (nextY >= MAX_Y) {
      nextY = MAX_Y;
      nextVy = -Math.abs(nextVy);
    }

    const slowdown = Math.exp(-FRICTION * delta);
    nextVx *= slowdown;
    nextVy *= slowdown;

    if (Math.hypot(nextVx, nextVy) < STOP_SPEED) {
      nextVx = 0;
      nextVy = 0;
    }

    x.value = nextX;
    y.value = nextY;
    vx.value = nextVx;
    vy.value = nextVy;
  });

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <View style={styles.container}>
      <Box>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.ball, ballStyle]} />
        </GestureDetector>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: BOX_WIDTH + BORDER_WIDTH * 2,
    height: BOX_HEIGHT + BORDER_WIDTH * 2,
    borderWidth: BORDER_WIDTH,
    borderColor: '#4fa3f7',
    borderRadius: 8,
  },
  ball: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#e8663d',
  },
});
