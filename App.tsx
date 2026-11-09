import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

import { screens } from './src/screens';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PagerView style={styles.pager} initialPage={0}>
        {screens.map(({ key, Component }) => (
          <View key={key} style={styles.page}>
            <Component />
          </View>
        ))}
      </PagerView>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0d21' },
  pager: { flex: 1 },
  page: { flex: 1 },
});
