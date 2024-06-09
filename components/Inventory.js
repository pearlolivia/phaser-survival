export default class Inventory {
    constructor() {
        this.items = {
            0: {
                name: 'bottle',
                quantity: 15,
            },
            1: {
                name: 'pink_milk',
                quantity: 1,
            },
        };
    }

    getItem(slotIndex) {
        return this.items[slotIndex];
    }
}