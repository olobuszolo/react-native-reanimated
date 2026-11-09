import { Button, StyleSheet, View } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Box } from '../components/Box';

export default function TimingSequence() {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + progress.value * 0.7,
    transform: [
      { translateY: -progress.value * 100 },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const runTiming = () => {
    progress.value = withTiming(progress.value > 0.5 ? 0 : 1, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });
  };

  const shake = () => {
    rotation.value = withSequence(
      withTiming(-15, { duration: 50 }),
      withRepeat(withTiming(15, { duration: 100 }), 5, true),
      withTiming(0, { duration: 50 }),
    );
  };

  const delayed = () => {
    progress.value = withDelay(500, withTiming(1, { duration: 400 }));
  };

  return (
    <View style={styles.container}>
      <Box style={animatedStyle} />
      <View style={styles.buttons}>
        <Button title="Timing" onPress={runTiming} />
        <Button title="Shake" onPress={shake} />
        <Button title="Delay" onPress={delayed} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 120 },
  buttons: { flexDirection: 'row' },
});
