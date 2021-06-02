var isGameOn = true;

var grid = document.getElementsByTagName('td');
var rightButton = document.getElementById('RightButton');
var upButton = document.getElementById('UpButton');
var leftButton = document.getElementById('LeftButton');
var downButton = document.getElementById('DownButton');
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

    addRandom() {
        var randomNum = Math.floor(Math.random() * 16);
        var y = Math.floor(randomNum / 4);
        var x = randomNum % 4;
        while(this.grid[y][x].tileValue != 0){
            var randomNum = Math.floor(Math.random() * 16);
            var y = Math.floor(randomNum / 4);
            var x = randomNum % 4;
        }
        this.grid[y][x].value = 2;
    }

    goRight() {
        for(var j=3; j>=0; j--){
            for(var i=0; i<4; i++){
                if(this.grid[i][j].tileValue != 0){
                    var k = j;
                    while(k !=3 && (this.grid[i][k+1].tileValue == 0 || this.grid[i][k+1].tileValue == this.grid[i][k].tileValue)){
                        if(this.grid[i][k].tileValue == this.grid[i][k+1].tileValue){
                            var nextVal = this.grid[i][k+1].tileValue;
                            this.grid[i][k+1].tileValue = nextVal * 2;
                            this.grid[i][k].tileValue = 0;
                        } else if(this.grid[i][k+1].tileValue == 0){
                            var currVal = this.grid[i][k].tileValue;
                            this.grid[i][k+1].tileValue = currVal;
                            this.grid[i][k].tileValue = 0;
                        }
                    }
                }
            }
        }
        this.addRandom();
    }

    goLeft() {
        for(var j=0; j<4; j++){
            for(var i=0; i<4; i++){
                if(this.grid[i][j].tileValue !== 0){
                    var k = j;
                    while(k !== 0 && (this.grid[i][k-1].tileValue == 0 || this.grid[i][k-1].tileValue == this.grid[i][k].tileValue)){
                        if(this.grid[i][k-1].tileValue == this.grid[i][k].tileValue){
                            var nextVal = this.grid[i][j-1].tileValue;
    
                            this.grid[i][k-1].tileValue = nextVal * 2;
                            this.grid[i][k].tileValue = 0;
                            k--;
                        } else if (this.grid[i][k-1].tileValue == 0) {
                            var currVal = this.grid[i][k].tileValue;
    
                            this.grid[i][k-1].tileValue = currVal;
                            this.grid[i][k].tileValue = 0;
                            k--;
                        }
                    }
                }
            }
        }
        this.addRandom();

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
        this.addRandom();
    }

    goDown() {
        for(var i=3; i>=0; i--){
            for(var j=0; j<4; j++){
                if(this.grid[i][j].tileValue != 0){
                    var k = i;
                    while(k !== 3 && (this.grid[k+1][j].tileValue == 0 || this.grid[k+1][j].tileValue == this.grid[k][j].tileValue )){
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
        this.addRandom();

    }

    get getGrid(){
        return this.grid;
    }

    initializeGame(){
        var randomNum = Math.floor(Math.random() * 16);
        var y = Math.floor(randomNum / 4);
        var x = randomNum % 4;

        this.grid[y][x].value = 2;
    }
}

var board = new Board();
board.initializeGame();

for(var i = 0; i<16; i++){
    var row = Math.floor(i / 4);
    var col = i % 4;
    grid[i].innerHTML = board.getGrid[row][col].tileValue
}

upButton.onclick = () => {
    board.goUp();
    for(var i = 0; i<16; i++){
        var row = Math.floor(i / 4);
        var col = i % 4;
        grid[i].innerHTML = board.getGrid[row][col].tileValue
    }
}

downButton.onclick = () => {
    board.goDown();
    for(var i = 0; i<16; i++){
        var row = Math.floor(i / 4);
        var col = i % 4;
        grid[i].innerHTML = board.getGrid[row][col].tileValue
    }
}

rightButton.onclick = () => {
    board.goRight();
    for(var i = 0; i<16; i++){
        var row = Math.floor(i / 4);
        var col = i % 4;
        grid[i].innerHTML = board.getGrid[row][col].tileValue
    }
}

leftButton.onclick = () => {
    board.goLeft();
    for(var i = 0; i<16; i++){
        var row = Math.floor(i / 4);
        var col = i % 4;
        grid[i].innerHTML = board.getGrid[row][col].tileValue
    }
}


// not end of tile
// should be empty or same tile