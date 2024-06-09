export default class Inventory {
    constructor() {
        this.maxColumns = 5;
        this.rows = 1;
        this.items = {
            0: {
                name: 'bottle',
                quantity: 15,
            },
            1: {
                name: 'aubergine',
                quantity: 1,
            },
        };
    }

    getItem(slotIndex) {
        return this.items[slotIndex];
    }

    addItem(item) {
        // check if item already in inventory + add to quantity
        let existingIndex = Object.keys(this.items).find(key => this.items[key].name === item.name);
        if (existingIndex) {
            this.items[existingIndex].quantity += item.quantity; 
        } else {
            for (let i = 0; i < this.maxColumns * this.rows; i++) {
                // check if slot is populated
                let existingItem = this.items[i];
                if (!existingItem) {
                    this.items[i] = item;
                    break;
                }
            }
        }
    }
}