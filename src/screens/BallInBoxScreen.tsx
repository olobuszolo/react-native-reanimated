import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export const BOX_WIDTH = 300;
export const BOX_HEIGHT = 400;
const BORDER_WIDTH = 2;

export function isInsideBox(x: number, y: number, size = 0) {
  'worklet';
  return (
    x >= 0 && y >= 0 && x + size <= BOX_WIDTH && y + size <= BOX_HEIGHT
  );
}

export function Box({ children }: { children?: ReactNode }) {
  return <View style={styles.box}>{children}</View>;
}

export default function BallInBoxScreen() {
  return (
    <View style={styles.container}>
      <Box />
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
});
