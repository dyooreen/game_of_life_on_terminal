const matrix = require('./game.settings');
const array = require('./game.array');
const LivingCreature = require('./class.LivingCreature');
const Grass = require('./class.grass');
const GrassEater = require('./class.grasseater');
const Predator = require('./class.predator');
const Angel = require('./class.angel');
const grassArr = array.grassArr;
const GrassEaterArr = array.GrassEaterArr;
const PredatorArr = array.PredatorArr;
const DevilArr = array.DevilArr;
const AngelArr = array.AngelArr;
class God extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.multiply = Math.floor(Math.random()*4);
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {
        this.revive();
        this.getNewCoordinates();
        let newCell = super.random(this.chooseCell(1));
        if (newCell) {
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 4;
        }
    }

    revive() {
        let resolution = array.resolution;
        this.multiply++;
        let rx = Math.floor(Math.random()*resolution);
        let ry = Math.floor(Math.random()*resolution);
        if (grassArr.length == 0 && matrix[ry][rx] == 0) {
            matrix[ry][rx] = 1;
            let gr = new Grass(rx, ry);
            grassArr.push(gr);
        }
        if (GrassEaterArr.length <= 2 && matrix[ry][rx] == 1 && this.multiply >= 20) {
            this.multiply = 0;
            for (let i in grassArr) {
                if (rx == grassArr[i].x && ry == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[ry][rx] = 2;
            let gr = new GrassEater(rx, ry);
            GrassEaterArr.push(gr);
        }
        if (PredatorArr.length < 2 && matrix[ry][rx] == 0 && this.multiply >= 5) {
            matrix[ry][rx] = 3;
            let gr = new Predator(rx, ry);
            PredatorArr.push(gr);
        }
        if (DevilArr.length >= 3 && matrix[ry][rx] == 0) {
            for (let i = 0; i < 3; i++) {
                matrix[ry][rx] = 7;
                let gr = new Angel(rx, ry);
                AngelArr.push(gr);
            }
        }
    }
}
module.exports = God;