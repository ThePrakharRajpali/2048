var isGameOn = true;

var grid = document.getElementsByTagName('td');
var gameOn = false;
var gameScore = 0;  

class Tile {
    constructor(value, x, y){
        this.value = value;
        this.x = x;
        this.y = y;
    }

    get tileValue() {
        return this.value;
    }

    get tileX() {
        return this.x;
    }

    get tileY() {
        return this.y;
    }

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }

    moveUp() {
        this.y--;
    }

    moveDown() {
        this.y++
    }

    set tileValue(x) {
        this.value = x;
    }
}

class Board {
    constructor() {
        this.grid = [];
        for(var i =0; i<4; i++) {
            var row = [];
            for(var j =0; j<4; j++){
                var newTile = new Tile(0, j, i);
                row.push(newTile);
            }
            this.grid.push(row);
        }
    }

    goRight() {
        for(var j=3; j>-1;j--){
            for(var i=0; i<4; i++){
                while(j !== 3 && (this.grid[i][j+1].tileValue() == 0 || this.grid[i][j+1].tileValue() == this.grid[i][j].tileValue())){
                    if(this.grid[i][j+1].tileValue() == this.grid[i][j].tileValue()){
                        var nextVal = this.grid[i][j+1].tileValue();

                        this.grid[i][j+1].tileValue(nextVal * 2);
                        this.grid[i][j+1].tileValue(0);
                    } else if(this.grid[i][j+1].tileValue() == 0) {
                        var currVal = this.grid[i][j].tileValue();

                        this.grid[i][j+1].tileValue(currVal);
                        this.grid[i][j+1].tileValue(0);
                    }
                }
            }
        }
    }

    goLeft() {

    }

    goUp() {

    }

    goDown() {

    }

    get getGrid(){
        return this.grid;
    }
}

var board = new Board();

console.log(board);

// not end of tile
// should be empty or same tile