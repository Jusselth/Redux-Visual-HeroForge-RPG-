export interface Item {
    id: string;
    name: string;
    icon: string;
    category: 'Weapon' | 'Armor' | 'Accessory';
    bonusStr: number;
    bonusAgi: number;
    bonusInt: number;
    weight: number;
}

export interface ActionLog {
    id: string;
    actionType: string;
    payload: string;
    timestamp: string;
}