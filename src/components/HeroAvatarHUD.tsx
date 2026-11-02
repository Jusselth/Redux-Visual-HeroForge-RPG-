import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store';
import { selectHeroComputedStatus } from '../store/selectors';

export const HeroAvatarHUD: React.FC = () => {
    const status = useAppSelector(selectHeroComputedStatus);

    const hpPercentage = Math.max(0, (status.currentHp / status.maxHp) * 100);
    const weightPercentage = Math.min(100, (status.currentWeight / status.maxWeightCapacity) * 100);

    let weightBarColor = '#22c55e';
    if (status.isOverloaded) {
        weightBarColor = '#ef4444';
    } else if (weightPercentage > 75) {
        weightBarColor = '#eab308';
    }

    return (
        <View style={styles.container}>
            <View style={[styles.avatarCircle, { borderColor: status.auraColor }]}>
                <Text style={styles.avatarEmoji}>
                    {status.isDefeated ? '💀' : status.avatarEmoji}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.heroClass}>{status.heroClass}</Text>
                    <Text style={styles.powerBadge}>⚡ {status.combatPower} PWR</Text>
                </View>

                <View style={styles.barGroup}>
                    <Text style={styles.barLabel}>
                        Salud (HP): {status.currentHp} / {status.maxHp}
                    </Text>
                    <View style={styles.track}>
                        <View style={[styles.fill, { width: `${hpPercentage}%`, backgroundColor: '#ef4444' }]} />
                    </View>
                </View>

                <View style={styles.barGroup}>
                    <Text style={styles.barLabel}>
                        Carga: {status.currentWeight}kg / {status.maxWeightCapacity}kg
                        {status.isOverloaded ? ' ⚠️ SOBRECARGADO' : ''}
                    </Text>
                    <View style={styles.track}>
                        <View
                            style={[
                                styles.fill,
                                { width: `${weightPercentage}%`, backgroundColor: weightBarColor },
                            ]}
                        />
                    </View>
                </View>

                <Text style={styles.statsSummary}>
                    STR: {status.totalStr} | AGI: {status.totalAgi} | INT: {status.totalInt}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 14,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#334155',
    },
    avatarCircle: {
        width: 74,
        height: 74,
        borderRadius: 37,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        marginRight: 14,
    },
    avatarEmoji: { fontSize: 36 },
    infoContainer: { flex: 1 },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    heroClass: { fontSize: 16, fontWeight: 'bold', color: '#f8fafc' },
    powerBadge: { fontSize: 13, fontWeight: 'bold', color: '#fbbf24' },
    barGroup: { marginBottom: 6 },
    barLabel: { fontSize: 11, color: '#94a3b8', marginBottom: 2 },
    track: { height: 8, backgroundColor: '#334155', borderRadius: 4, overflow: 'hidden' },
    fill: { height: '100%' },
    statsSummary: { fontSize: 11, color: '#cbd5e1', fontWeight: '600', marginTop: 2 },
});