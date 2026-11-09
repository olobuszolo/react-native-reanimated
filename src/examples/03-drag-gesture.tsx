import { StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Box } from '../components/Box';

export default function Drag() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const pressed = useSharedValue(false);

  // Gesture Handler v3: gesty tworzy się hookami (usePanGesture itd.).
  const pan = usePanGesture({
    onActivate: () => {
      'worklet';
      startX.value = x.value;
      startY.value = y.value;
      pressed.value = true;
    },
    onUpdate: (e) => {
      'worklet';
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    },
    onFinalize: () => {
      'worklet';
      pressed.value = false;
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: withSpring(pressed.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed.value ? '#ec4899' : '#4f46e5',
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Box style={animatedStyle} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
