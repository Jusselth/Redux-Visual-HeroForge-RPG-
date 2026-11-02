import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { incrementStat, decrementStat, resetStats, applyBuildPreset } from '../store/slices/statsSlice';

export const StatsControlPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { availablePoints, str, agi, int } = useAppSelector((state) => state.stats);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Panel de Atributos</Text>
                <Text style={styles.pointsBadge}>Puntos: {availablePoints}</Text>
            </View>

            {(['str', 'agi', 'int'] as const).map((statKey) => {
                const value = statKey === 'str' ? str : statKey === 'agi' ? agi : int;
                const label = statKey === 'str' ? 'Fuerza (STR)' : statKey === 'agi' ? 'Agilidad (AGI)' : 'Inteligencia (INT)';

                return (
                    <View key={statKey} style={styles.row}>
                        <Text style={styles.statLabel}>{label}</Text>
                        <View style={styles.controls}>
                            <TouchableOpacity
                                style={[styles.btn, value <= 1 && styles.btnDisabled]}
                                disabled={value <= 1}
                                onPress={() => dispatch(decrementStat(statKey))}
                            >
                                <Text style={styles.btnText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.statValue}>{value}</Text>
                            <TouchableOpacity
                                style={[styles.btn, availablePoints <= 0 && styles.btnDisabled]}
                                disabled={availablePoints <= 0}
                                onPress={() => dispatch(incrementStat(statKey))}
                            >
                                <Text style={styles.btnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}

            <View style={styles.presetRow}>
                <TouchableOpacity style={styles.presetBtn} onPress={() => dispatch(applyBuildPreset('WARRIOR'))}>
                    <Text style={styles.presetText}>Build Guerrero</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => dispatch(applyBuildPreset('MAGE'))}>
                    <Text style={styles.presetText}>Build Mago</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => dispatch(applyBuildPreset('ROGUE'))}>
                    <Text style={styles.presetText}>Build Asesino</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={() => dispatch(resetStats())}>
                <Text style={styles.resetText}>🧪 Poción de Reseteo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e293b',
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#334155',
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    title: { fontSize: 15, fontWeight: 'bold', color: '#f8fafc' },
    pointsBadge: { fontSize: 13, fontWeight: 'bold', color: '#38bdf8' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    statLabel: { fontSize: 13, color: '#cbd5e1' },
    controls: { flexDirection: 'row', alignItems: 'center' },
    btn: { width: 30, height: 30, backgroundColor: '#3b82f6', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
    btnDisabled: { backgroundColor: '#475569' },
    btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
    statValue: { width: 32, textAlign: 'center', color: '#f8fafc', fontWeight: 'bold' },
    presetRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    presetBtn: { backgroundColor: '#334155', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 6 },
    presetText: { color: '#e2e8f0', fontSize: 11, fontWeight: '600' },
    resetBtn: { marginTop: 10, backgroundColor: '#7c3aed', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
    resetText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
});