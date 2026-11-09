import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { examples } from './src/examples';

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = examples.find((e) => e.id === activeId);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.flex}>
          {active ? (
            <View style={styles.flex}>
              <Pressable onPress={() => setActiveId(null)} style={styles.back}>
                <Text style={styles.backText}>← Wróć do listy</Text>
              </Pressable>
              <Text style={styles.title}>{active.title}</Text>
              <active.Component />
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.list}>
              <Text style={styles.title}>Reanimated – ćwiczenia</Text>
              {examples.map((e) => (
                <Pressable
                  key={e.id}
                  onPress={() => setActiveId(e.id)}
                  style={styles.item}>
                  <Text style={styles.itemTitle}>{e.title}</Text>
                  <Text style={styles.itemDesc}>{e.description}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', padding: 16 },
  item: { padding: 16, borderRadius: 12, backgroundColor: '#f1f3f9' },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemDesc: { marginTop: 4, color: '#555' },
  back: { paddingHorizontal: 16, paddingTop: 8 },
  backText: { color: '#4f46e5', fontSize: 16 },
});
