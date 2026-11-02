import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionLog } from './types';

interface ActionLogState {
    logs: ActionLog[];
}

const initialState: ActionLogState = {
    logs: [],
};

export const actionLogSlice = createSlice({
    name: 'actionLog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            (action): action is PayloadAction<unknown> => action.type.startsWith('stats/') || action.type.startsWith('inventory/'),
            (state, action) => {
                let payloadStr = 'Sin Payload';
                if (typeof action.payload === 'string' || typeof action.payload === 'number') {
                    payloadStr = String(action.payload);
                } else if (action.payload) {
                    payloadStr = JSON.stringify(action.payload);
                }

                const newLog: ActionLog = {
                    id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                    actionType: action.type,
                    payload: payloadStr,
                    timestamp: new Date().toLocaleTimeString(),
                };

                state.logs = [newLog, ...state.logs].slice(0, 5);
            }
        );
    },
});

export default actionLogSlice.reducer;