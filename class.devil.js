const matrix = require('./game.settings');
const LivingCreature = require('./class.LivingCreature');
const array = require('./game.array');
const GrassEaterArr = array.GrassEaterArr;
class Devil extends LivingCreature {
    constructor(x, y) {
        super(x, y)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 6;
        }
    }
    eat() {
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(2));
        if (newCell) {
            for (let i in GrassEaterArr) {
                if (newCell[0] == GrassEaterArr[i].x && newCell[1] == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 6;
        } else {
            this.move();
        }

    }
}
module.exports = Devil;