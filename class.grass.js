const matrix = require('./game.settings');
const LivingCreature = require('./class.LivingCreature');
const array = require('./game.array');
const grassArr = array.grassArr;
class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.multiply = Math.floor(Math.random() * 10);
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
        return super.chooseCell(character)
    }
    mul() {
        this.multiply++;
        let newCell = super.random(this.chooseCell(0));
        if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
module.exports = Grass;