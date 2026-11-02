import { RootState } from './index';

export const selectHeroComputedStatus = (state: RootState) => {
    const { str, agi, int, currentHp, maxHp } = state.stats;
    const { catalog, equippedIds } = state.inventory;

    const equippedItems = catalog.filter((item) => equippedIds.includes(item.id));

    const totalStr = str + equippedItems.reduce((acc, item) => acc + item.bonusStr, 0);
    const totalAgi = agi + equippedItems.reduce((acc, item) => acc + item.bonusAgi, 0);
    const totalInt = int + equippedItems.reduce((acc, item) => acc + item.bonusInt, 0);

    const currentWeight = equippedItems.reduce((acc, item) => acc + item.weight, 0);
    const maxWeightCapacity = 10 + totalStr * 2;
    const isOverloaded = currentWeight > maxWeightCapacity;

    let heroClass = 'Aldeano Novato';
    let auraColor = '#94a3b8';
    let avatarEmoji = '🧑‍🌾';

    if (totalStr >= 15 && totalStr >= totalInt && totalStr >= totalAgi) {
        heroClass = 'Guerrero Berserker';
        auraColor = '#ef4444';
        avatarEmoji = '⚔️';
    } else if (totalInt >= 15 && totalInt >= totalStr && totalInt >= totalAgi) {
        heroClass = 'Archimago Arcano';
        auraColor = '#3b82f6';
        avatarEmoji = '🧙‍♂️';
    } else if (totalAgi >= 15 && totalAgi >= totalStr && totalAgi >= totalInt) {
        heroClass = 'Asesino Sombrío';
        auraColor = '#10b981';
        avatarEmoji = '🥷';
    }

    const rawPower = totalStr * 3 + totalAgi * 2 + totalInt * 3;
    const combatPower = isOverloaded ? Math.round(rawPower * 0.7) : rawPower;

    return {
        totalStr,
        totalAgi,
        totalInt,
        currentWeight,
        maxWeightCapacity,
        isOverloaded,
        heroClass,
        auraColor,
        avatarEmoji,
        combatPower,
        currentHp,
        maxHp,
        isDefeated: currentHp <= 0,
        equippedCount: equippedItems.length,
    };
};