const array = require('./game.array');
const resolution = array.resolution;
function matrix(m) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix.push([]);
        for (let j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 2);
        }
    }
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 2;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 7;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 4;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 5;
    matrix[Math.floor(Math.random() * matrix.length)][Math.floor(Math.random() * matrix[0].length)] = 6;
    return matrix;
}


var matrix = matrix(resolution);
module.exports = matrix;
