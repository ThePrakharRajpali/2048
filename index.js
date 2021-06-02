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
                if(this.grid[i][j].tileValue !== 0){
                    var k = j;
                    while(k !== 3 && (this.grid[i][k+1].tileValue == 0 || this.grid[i][k+1].tileValue == this.grid[i][k].tileValue())){
                        if(this.grid[i][k+1].tileValue == this.grid[i][j].tileValue){
                            var nextVal = this.grid[i][k+1].tileValue;

                            this.grid[i][k+1].tileValue = nextVal * 2;
                            this.grid[i][k+1].tileValue = 0;
                            k++;
                        } else if(this.grid[i][k+1].tileValue == 0) {
                            var currVal = this.grid[i][k].tileValue;

                            this.grid[i][k+1].tileValue = currVal;
                            this.grid[i][k+1].tileValue = 0;
                            k++;
                        }

                    }
                } 
            }
        }
    }

    goLeft() {
        for(var j=0; j<3; j++){
            for(var i=0; i<4; i++){
                if(this.grid[i][j].tileValue !== 0){
                    var k = j;
                    while(k !== 0 && (this.grid[i][k-1].tileValue == 0 || this.grid[i][k-1].tileValue == this.grid[i][k].tileValue)){
                        if(this.grid[i][k-1].tileValue == this.grid[i][k].tileValue){
                            var nextVal = this.grid[i][j-1].tileValue;
    
                            this.grid[i][k-1].tileValue = nextVal * 2;
                            this.grid[i][k-1].tileValue = 0;
                            k--;
                        } else if (this.grid[i][k-1].tileValue == 0) {
                            var currVal = this.grid[i][k].tileValue;
    
                            this.grid[i][k-1].tileValue = currVal;
                            this.grid[i][k+1].tileValue = 0;
                            k--;
                        }
                    }
                }
            }
        }
    }

    goUp() {
        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(this.grid[i][j].tileValue != 0){
                    var k = i;
                    while(k !== 0 && (this.grid[k-1][j].tileValue == 0 || this.grid[k][j].tileValue == this.grid[k-1][j].tileValue)){
                        if(this.grid[k][j].tileValue == this.grid[k-1][j].titleValue){
                            var nextVal = this.grid[k-1][j].tileValue;

                            this.grid[k-1][j].tileValue = nextVal * 2;
                            this.grid[k][j].tileValue = 0;
                            k--;
                        } else if(this.grid[k-1][j].tileValue == 0){
                            var currVal = this.grid[k][j].tileValue;

                            this.grid[k-1][j].tileValue = currVal;
                            this.grid[k][j].tileValue = 0;
                            k--;
                        }
                    }
                }
            }
        }
    }

    goDown() {
        for(var i=3; i>=0; i--){
            for(var j=0; j<4; j++){
                if(this.grid[i][j].tileValue != 0){
                    var k = i;
                    while(k !== 3 && (this.grid[k+1][j].tileValue == 0 || this.grid[k+1][j] == this.grid[k-1][j].tileValue )){
                        if(this.grid[k][j].tileValue == this.grid[k+1][j].tileValue){
                            var nextVal = this.grid[k+1][j].tileValue;

                            this.grid[k+1][j].tileValue = nextVal * 2;
                            this.grid[k][j].tileValue = 0;
                            k++;
                        } else if (this.grid[k+1][j].tileValue == 0){
                            var currVal = this.grid[k][j].tileValue;

                            this.grid[k+1][j].tileValue = currVal;
                            this.grid[k][j].tileValue = 0;
                            k++;
                        }
                    }
                }
            }
        }
    }

    get getGrid(){
        return this.grid;
    }

    initializeGame(){
        var randomNum = Math.floor(Math.random() * 16);
        var y = Math.floor(randomNum / 4);
        var x = randomNum % 4;
        console.log(y);
        console.log(x);
        this.grid[y][x].value = 2;
    }
}

var board = new Board();
board.initializeGame();

console.log(board.getGrid);

board.goLeft();
console.log(board.getGrid);
// not end of tile
// should be empty or same tile