import { Pressable, StyleSheet, View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useFrameCallback,
    useSharedValue,

  } from 'react-native-reanimated';

const GRAVITY = 1500;
const BOUNCE_FACTOR = 0.8;

export default function BouncingBallScreen() {
    const velocity = useSharedValue(0);
    const y = useSharedValue(-200);

    useFrameCallback((frameInfo) => {
        'worklet';
        const delta = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
        velocity.value = velocity.value + GRAVITY * delta;
        let next = y.value + velocity.value * delta;
        if (next >= 200) {
            next = 200;
            velocity.value = -velocity.value * BOUNCE_FACTOR;
        } else if (next <= 0) {
            next = 0;
        }
        y.value = next;
    })

    const ballStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value }],
    }));

    const reset = () => {
        velocity.value = 0;
        y.value = 0;
    };

    return (
        <Pressable
            style={styles.pressable}
            onLongPress={reset}
            delayLongPress={1000}>
            <View style={styles.container}>
                <Animated.View style={[styles.ball, ballStyle]} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ball: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25,
    },
});