const matrix = require('./game.settings');
const LivingCreature = require('./class.LivingCreature');
const array = require('./game.array');
const grassArr = array.grassArr;
const GrassEaterArr = array.GrassEaterArr;
class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
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
    eat() {
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(1));
        if (newCell) {
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.energy++;
            this.mul();
        } else {
            this.move();
        }
    }
    move() {
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.energy--;
            this.die();
        }
    }
    die() {
        if (this.energy <= 0) {
            for (let i in GrassEaterArr) {
                if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 0;
        }
    }
    mul() {
        let newCell = super.random(this.chooseCell(0));
        if (newCell && this.energy >= 12) {
            matrix[newCell[1]][newCell[0]] = 2;
            let gr = new GrassEater(newCell[0], newCell[1]);
            GrassEaterArr.push(gr);
            this.energy = 1;
        }
    }
}
module.exports = GrassEater;