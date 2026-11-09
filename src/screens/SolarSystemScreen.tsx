import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const SUN_SIZE = 80;
const ORBIT_1_DURATION = 8000;
const PLANET_1_SPIN_DURATION = 2000;

const PLANET_1_SIZE = 24;
const ORBIT_1_SIZE = 180;

const PLANET_2_SIZE = 36;
const ORBIT_2_SIZE = 300;

export default function SolarSystemScreen() {
  const orbit1Angle = useSharedValue(0);
  const planet1Angle = useSharedValue(0);

  const planet2Angle = useSharedValue(0);
  const orbit2Angle = useSharedValue(0);

  useEffect(() => {
    
    orbit1Angle.value = withRepeat(
      withTiming(360, { duration: ORBIT_1_DURATION, easing: Easing.linear }),
      -1,
    );
    planet1Angle.value = withRepeat(
      withTiming(360, { duration: PLANET_1_SPIN_DURATION, easing: Easing.linear }),
      -1,
    );
    planet2Angle.value = withRepeat(
      withTiming(360, { duration: ORBIT_1_DURATION, easing: Easing.linear }),
      -1,
    );
    orbit2Angle.value = withRepeat(
      withTiming(360, { duration: ORBIT_1_DURATION, easing: Easing.linear }),
      -1,
    );
  }, []);

  const orbitStyle = (orbitNumber: 1 | 2) => useAnimatedStyle(() => ({
    transform: [{ rotate: `${orbitNumber === 1 ? orbit1Angle.value : orbit2Angle.value}deg` }],
  }));

  const planetStyle = (planetNumber: 1 | 2) => useAnimatedStyle(() => ({
    transform: [{ rotate: `${planetNumber === 1 ? planet1Angle.value : planet2Angle.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.system}>
        <Animated.View style={[styles.orbit1, orbitStyle(1)]}>
          <Animated.View style={[styles.planet1, planetStyle(1)]}>
            <View style={styles.planet1Spot} />
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.orbit2, orbitStyle(2)]}>
          <Animated.View style={[styles.planet2, planetStyle(2)]}>
            <View style={styles.planet2Spot} />
          </Animated.View>
        </Animated.View>

        <View style={styles.sun} />
      </View>
    </View>
  );
}

const orbit = {
  position: 'absolute',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.25)',
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  system: {
    width: ORBIT_2_SIZE,
    height: ORBIT_2_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sun: {
    width: SUN_SIZE,
    height: SUN_SIZE,
    borderRadius: SUN_SIZE / 2,
    backgroundColor: '#fdb813',
  },
  orbit1: {
    ...orbit,
    width: ORBIT_1_SIZE,
    height: ORBIT_1_SIZE,
    borderRadius: ORBIT_1_SIZE / 2,
  },
  planet1: {
    position: 'absolute',
    top: -PLANET_1_SIZE / 2,
    left: ORBIT_1_SIZE / 2 - PLANET_1_SIZE / 2,
    width: PLANET_1_SIZE,
    height: PLANET_1_SIZE,
    borderRadius: PLANET_1_SIZE / 2,
    backgroundColor: '#4fa3f7',
  },
  planet1Spot: {
    width: PLANET_1_SIZE / 3,
    height: PLANET_1_SIZE / 3,
    borderRadius: PLANET_1_SIZE / 6,
    backgroundColor: '#ffffff',
  },
  orbit2: {
    ...orbit,
    width: ORBIT_2_SIZE,
    height: ORBIT_2_SIZE,
    borderRadius: ORBIT_2_SIZE / 2,
  },
  planet2: {
    position: 'absolute',
    top: ORBIT_2_SIZE / 2 - PLANET_2_SIZE / 2,
    right: -PLANET_2_SIZE / 2,
    width: PLANET_2_SIZE,
    height: PLANET_2_SIZE,
    borderRadius: PLANET_2_SIZE / 2,
    backgroundColor: '#e8663d',
  },
  planet2Spot: {
    width: PLANET_2_SIZE / 3,
    height: PLANET_2_SIZE / 3,
    borderRadius: PLANET_2_SIZE / 6,
    backgroundColor: '#ffffff',
  },
});
