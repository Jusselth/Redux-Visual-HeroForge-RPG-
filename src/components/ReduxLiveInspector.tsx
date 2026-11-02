import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { takeDamage, healHero } from '../store/slices/statsSlice';

export const ReduxLiveInspector: React.FC = () => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector((state) => state.actionLog.logs);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Arena de Simulación</Text>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.damageBtn} onPress={() => dispatch(takeDamage(25))}>
                    <Text style={styles.btnText}>⚔️ Recibir Daño (-25 HP)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.healBtn} onPress={() => dispatch(healHero())}>
                    <Text style={styles.btnText}>🧪 Curar Total</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Inspector de Redux en Vivo (Últimas 5 acciones)</Text>
            <View style={styles.console}>
                {logs.length === 0 ? (
                    <Text style={styles.emptyText}>Esperando acciones despachadas...</Text>
                ) : (
                    logs.map((log) => (
                        <View key={log.id} style={styles.logItem}>
                            <Text style={styles.logTime}>[{log.timestamp}]</Text>
                            <Text style={styles.logType} numberOfLines={1}>{log.actionType}</Text>
                            <Text style={styles.logPayload} numberOfLines={1}>➔ {log.payload}</Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e293b',
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#334155',
    },
    title: { fontSize: 15, fontWeight: 'bold', color: '#f8fafc', marginBottom: 10 },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    damageBtn: { flex: 0.48, backgroundColor: '#b91c1c', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
    healBtn: { flex: 0.48, backgroundColor: '#15803d', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
    btnText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
    subtitle: { fontSize: 12, fontWeight: 'bold', color: '#94a3b8', marginBottom: 6 },
    console: { backgroundColor: '#090d16', padding: 8, borderRadius: 6 },
    emptyText: { color: '#64748b', fontSize: 11, fontStyle: 'italic' },
    logItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    logTime: { color: '#64748b', fontSize: 10, marginRight: 6 },
    logType: { color: '#38bdf8', fontSize: 10, fontWeight: 'bold', flex: 1 },
    logPayload: { color: '#facc15', fontSize: 10, width: 110, textAlign: 'right' },
});