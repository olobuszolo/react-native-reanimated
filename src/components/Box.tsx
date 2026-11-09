import Animated from 'react-native-reanimated';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ViewProps } from 'react-native';

export const BOX_SIZE = 80;

export function Box({ style, ...rest }: AnimatedProps<ViewProps>) {
  return (
    <Animated.View
      {...rest}
      style={[
        { width: BOX_SIZE, height: BOX_SIZE, borderRadius: 16, backgroundColor: '#4f46e5' },
        style,
      ]}
    />
  );
}
