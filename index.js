const matrix = require('./game.settings');
const array = require('./game.array');
const Grass = require('./class.grass');
const GrassEater = require('./class.grasseater');
const Predator = require('./class.predator');
const Devil = require('./class.devil');
const Satan = require('./class.satan');
const Angel = require('./class.angel');
const God = require('./class.god');
const grassArr = array.grassArr;
const GrassEaterArr = array.GrassEaterArr;
const PredatorArr = array.PredatorArr;
const DevilArr = array.DevilArr;
const SatanArr = array.SatanArr;
const AngelArr = array.AngelArr;
const GodArr = array.GodArr;
createObjects()

draw()
function draw() {
    const frame = 1000/30
    setInterval(function draw() {
        console.clear()
        for (let i in grassArr) {
            grassArr[i].mul();
        }
        for (let i in GrassEaterArr) {
            GrassEaterArr[i].eat();
        }
        for (let i in PredatorArr) {
            PredatorArr[i].eat();
        }
        for (let i in DevilArr) {
            DevilArr[i].move();
        }
        for (let i in SatanArr) {
            SatanArr[i].eat();
        }
        for (let i in AngelArr) {
            AngelArr[i].eat();
        }
        for (let i in GodArr) {
            GodArr[i].move();
        }
        console.log(matrix)
    }, frame);
}
function createObjects() {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y);
                GrassEaterArr.push(gr);
            }else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y);
                PredatorArr.push(gr);
            }else if (matrix[y][x] == 4) {
                let gr = new God(x, y);
                GodArr.push(gr);
            }else if (matrix[y][x] == 5) {
                let gr = new Satan(x, y);
                SatanArr.push(gr);
            } else if (matrix[y][x] == 6) {
                let gr = new Devil(x, y);
                DevilArr.push(gr);
            }
            else if (matrix[y][x] == 7) {
                let gr = new Angel(x, y);
                AngelArr.push(gr);
            }
        }
    }
}