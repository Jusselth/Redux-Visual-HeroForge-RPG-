import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './types';

interface InventoryState {
    catalog: Item[];
    equippedIds: string[];
}

const initialCatalog: Item[] = [
    { id: 'item-1', name: 'Espada de Fuego', icon: '⚔️', category: 'Weapon', bonusStr: 8, bonusAgi: 2, bonusInt: 0, weight: 12 },
    { id: 'item-2', name: 'Escudo de Titanio', icon: '🛡️', category: 'Armor', bonusStr: 4, bonusAgi: 0, bonusInt: 0, weight: 18 },
    { id: 'item-3', name: 'Báculo Arcano', icon: '🪄', category: 'Weapon', bonusStr: 0, bonusAgi: 1, bonusInt: 10, weight: 6 },
    { id: 'item-4', name: 'Botas Élficas', icon: '🥾', category: 'Accessory', bonusStr: 0, bonusAgi: 7, bonusInt: 2, weight: 4 },
    { id: 'item-5', name: 'Armadura Maldita', icon: '🥋', category: 'Armor', bonusStr: 10, bonusAgi: -2, bonusInt: 0, weight: 25 },
    { id: 'item-6', name: 'Anillo de Maná', icon: '💍', category: 'Accessory', bonusStr: 0, bonusAgi: 0, bonusInt: 6, weight: 1 },
];

const initialState: InventoryState = {
    catalog: initialCatalog,
    equippedIds: [],
};

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        toggleEquipItem: (state, action: PayloadAction<string>) => {
            const index = state.equippedIds.indexOf(action.payload);
            if (index >= 0) {
                state.equippedIds.splice(index, 1);
            } else {
                state.equippedIds.push(action.payload);
            }
        },
        clearEquipment: (state) => {
            state.equippedIds = [];
        },
    },
});

export const { toggleEquipItem, clearEquipment } = inventorySlice.actions;
export default inventorySlice.reducer;