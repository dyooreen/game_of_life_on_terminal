const matrix = require('./game.settings');
class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    random(items) {
        return items[Math.floor(Math.random() * items.length)]
    };
    chooseCell(ch) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
module.exports = LivingCreature;