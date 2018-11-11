const matrix = require('./game.settings');
const LivingCreature = require('./class.LivingCreature');
const array = require('./game.array');
const grassArr = array.grassArr;
const GrassEaterArr = array.GrassEaterArr;
const PredatorArr = array.PredatorArr;
class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 16;
        this.multiply = Math.floor(Math.random(10));
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    eat() {
        this.multiply++;
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(2));
        if (newCell && this.multiply < 8) {
            for (let i in GrassEaterArr) {
                if (newCell[0] == GrassEaterArr[i].x && newCell[1] == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy++;
            this.multiply = this.multiply = 0;
            this.mul();
        } else {
            this.move();
        }
    }
    move() {
        this.multiply++;
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(1));
        if (newCell && this.multiply > 8) {
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy -= 3;
            this.multiply = 0;
            this.die();
        }
    }
    mul() {
        let newCell = super.random(this.chooseCell(0));
        if (newCell && this.energy >= 40) {
            matrix[newCell[1]][newCell[0]] = 3;
            let gr = new Predator(newCell[0], newCell[1]);
            PredatorArr.push(gr);
        } else {
            this.move();
        }
    }
    die() {
        if (this.energy <= 0) {
            for (let i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break
                }
            }
            matrix[this.y][this.x] = 0;
        }
    }
}
module.exports = Predator;