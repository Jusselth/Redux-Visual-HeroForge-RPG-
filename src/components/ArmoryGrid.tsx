import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleEquipItem, clearEquipment } from '../store/slices/inventorySlice';
import { selectHeroComputedStatus } from '../store/selectors';

export const ArmoryGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const catalog = useAppSelector((state) => state.inventory.catalog);
    const equippedIds = useAppSelector((state) => state.inventory.equippedIds);
    const { isOverloaded } = useAppSelector(selectHeroComputedStatus);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Armería y Equipamiento</Text>
                <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearEquipment())}>
                    <Text style={styles.clearText}>Desequipar Todo</Text>
                </TouchableOpacity>
            </View>

            {isOverloaded && (
                <View style={styles.alertBanner}>
                    <Text style={styles.alertText}>
                        ¡SOBRECARGADO! (-30% Poder de Combate)
                    </Text>
                </View>
            )}

            <View style={styles.grid}>
                {catalog.map((item) => {
                    const isEquipped = equippedIds.includes(item.id);
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, isEquipped && styles.cardEquipped]}
                            onPress={() => dispatch(toggleEquipItem(item.id))}
                        >
                            <Text style={styles.itemIcon}>{item.icon}</Text>
                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.itemDetail}>
                                {item.bonusStr > 0 ? `+${item.bonusStr}STR ` : ''}
                                {item.bonusAgi > 0 ? `+${item.bonusAgi}AGI ` : ''}
                                {item.bonusInt > 0 ? `+${item.bonusInt}INT ` : ''}
                            </Text>
                            <Text style={styles.itemWeight}>{item.weight} kg</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
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
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' },
    title: { fontSize: 15, fontWeight: 'bold', color: '#f8fafc' },
    clearBtn: { backgroundColor: '#dc2626', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
    clearText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
    alertBanner: { backgroundColor: '#7f1d1d', padding: 6, borderRadius: 6, marginBottom: 10, alignItems: 'center' },
    alertText: { color: '#fca5a5', fontSize: 11, fontWeight: 'bold' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: {
        width: '48%',
        backgroundColor: '#0f172a',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#334155',
        alignItems: 'center',
    },
    cardEquipped: { borderColor: '#38bdf8', backgroundColor: '#1e293b' },
    itemIcon: { fontSize: 24, marginBottom: 2 },
    itemName: { color: '#f8fafc', fontSize: 12, fontWeight: 'bold' },
    itemDetail: { color: '#a7f3d0', fontSize: 10, marginTop: 2 },
    itemWeight: { color: '#94a3b8', fontSize: 10, marginTop: 2 },
});