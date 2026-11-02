import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatsState {
    availablePoints: number;
    str: number;
    agi: number;
    int: number;
    currentHp: number;
    maxHp: number;
}

const initialState: StatsState = {
    availablePoints: 15,
    str: 5,
    agi: 5,
    int: 5,
    currentHp: 100,
    maxHp: 100,
};

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        incrementStat: (state, action: PayloadAction<'str' | 'agi' | 'int'>) => {
            if (state.availablePoints > 0) {
                state[action.payload] += 1;
                state.availablePoints -= 1;
            }
        },
        decrementStat: (state, action: PayloadAction<'str' | 'agi' | 'int'>) => {
            if (state[action.payload] > 1) {
                state[action.payload] -= 1;
                state.availablePoints += 1;
            }
        },
        takeDamage: (state, action: PayloadAction<number>) => {
            state.currentHp = Math.max(0, state.currentHp - action.payload);
        },
        healHero: (state) => {
            state.currentHp = state.maxHp;
        },
        resetStats: (state) => {
            const allocatedStr = state.str - 5;
            const allocatedAgi = state.agi - 5;
            const allocatedInt = state.int - 5;
            state.availablePoints += allocatedStr + allocatedAgi + allocatedInt;
            state.str = 5;
            state.agi = 5;
            state.int = 5;
        },
        applyBuildPreset: (state, action: PayloadAction<'WARRIOR' | 'MAGE' | 'ROGUE'>) => {
            const totalPointsToDistribute =
                state.availablePoints + (state.str - 5) + (state.agi - 5) + (state.int - 5);

            state.str = 5;
            state.agi = 5;
            state.int = 5;
            state.availablePoints = 0;

            if (action.payload === 'WARRIOR') {
                state.str += totalPointsToDistribute;
            } else if (action.payload === 'MAGE') {
                state.int += totalPointsToDistribute;
            } else if (action.payload === 'ROGUE') {
                state.agi += totalPointsToDistribute;
            }
        },
    },
});

export const {
    incrementStat,
    decrementStat,
    takeDamage,
    healHero,
    resetStats,
    applyBuildPreset,
} = statsSlice.actions;

export default statsSlice.reducer;