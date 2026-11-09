import { Button, StyleSheet, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Box } from '../components/Box';

export default function Basics() {
  // Shared value żyje na wątku UI – zmiana nie powoduje re-renderu Reacta.
  const offset = useSharedValue(0);
  const scale = useSharedValue(1);

  // Ten callback jest "workletem" – wykonuje się na wątku UI.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Box style={animatedStyle} />
      <View style={styles.buttons}>
        <Button title="W prawo" onPress={() => (offset.value = withSpring(offset.value + 50))} />
        <Button title="W lewo" onPress={() => (offset.value = withSpring(offset.value - 50))} />
        <Button title="Powiększ" onPress={() => (scale.value = withSpring(scale.value + 0.2))} />
        <Button
          title="Reset"
          onPress={() => {
            offset.value = withSpring(0);
            scale.value = withSpring(1);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 48 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
