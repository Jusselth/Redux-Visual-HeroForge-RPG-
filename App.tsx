import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { HeroAvatarHUD } from './src/components/HeroAvatarHUD';
import { StatsControlPanel } from './src/components/StatsControlPanel';
import { ArmoryGrid } from './src/components/ArmoryGrid';
import { ReduxLiveInspector } from './src/components/ReduxLiveInspector';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.mainTitle}>HeroForge RPG</Text>
                    <Text style={styles.subtitle}>Demostración de Redux Toolkit</Text>

                    {/* Las 4 Zonas Visuales Independientes */}
                    <HeroAvatarHUD />
                    <StatsControlPanel />
                    <ArmoryGrid />
                    <ReduxLiveInspector />
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0f172a' },
    scrollContent: { padding: 12 },
    mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#f8fafc', textAlign: 'center' },
    subtitle: { fontSize: 12, color: '#64748b', textAlign: 'center', marginBottom: 12 },
});