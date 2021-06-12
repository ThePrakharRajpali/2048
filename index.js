var isGameOn = true;
var grid = document.getElementsByClassName('grid-item')
var rightButton = document.getElementById('RightButton');
var upButton = document.getElementById('UpButton');
var leftButton = document.getElementById('LeftButton');
var downButton = document.getElementById('DownButton');
var gameScore = 0;  

var board = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
];

var powerOfTwos = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];

function showBoard(board, grid) {
    for(var i=0; i<16; i++){
        var value = board[Math.floor(i/4)][i%4];
        grid[i].innerHTML = value == 0 ? "" : value;
        if(value != 0){
            powerOfTwos.forEach(element => {
                grid[i].classList.remove(`grid-${element}`);
            });
            grid[i].classList.add(`grid-${value}`);
        } else {
            powerOfTwos.forEach(element => {
                grid[i].classList.remove(`grid-${element}`);
            });
        }
    }
}

function isFull(board) {
    for(var i=0; i<4; i++){
        for(var j=0; i<4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function addRandom(board) {
    if(!isFull(board)){
        var randomNum = Math.floor(Math.random() * 16);
        var x = Math.floor(randomNum / 4);
        var y = randomNum % 4;
    
        while(board[x][y] != 0){
            randomNum = Math.floor(Math.random() * 16);
            x = Math.floor(randomNum / 4);
            y = randomNum % 4;
        }
    
        board[x][y] = 2;
    
        console.log(`Added 2 at ${x} , ${y}`); 
        return board;
    } 
    console.log('Board is full');
    return board;
}

function swapTile(x1, y1, x2, y2, board){
    if(board[x2][y2] == 0){
        board[x2][y2] = board[x1][y1];
        board[x1][y1] = 0;
        console.log('Swap: Success');
        return board;
    } 
    console.log('Swap: Failed');

    return board;
}

function mergeTile(x1, y1, x2, y2, board) {
    if(board[x2][y2] == board[x1][y1]){
        board[x2][y2] *= 2;
        board[x1][y1] = 0;
        console.log('Merge: Success');
        return board;
    }
    console.log('Merge: Failed');

    return board;
}

function moveRight(board){
    //move --> merge --> move
    for(var i=0; i<4; i++){
        var j=2;
        while(j > -1){
            if( j!= 3 && board[i][j] != 0 && board[i][j+1] == 0){
                board = swapTile(i, j, i, j+1, board);
                j++;
            } else {
                j--;
            }
            
        }
    } 

    for(var i=0; i<4; i++){
        var j=3;
        while(j>0){
            if(board[i][j] == board[i][j-1] && board[i][j] != 0){
                board = mergeTile(i,j-1, i, j, board);
            }
            j--;
        }
    }

    for(var i=0; i<4; i++){
        var j=2;
        while(j > -1){
            if( j!= 3 && board[i][j] != 0 && board[i][j+1] == 0){
                board = swapTile(i, j, i, j+1, board);
                j++;
            } else {
                j--;
            }
            
        }
    } 
    return board;
}

function moveLeft(board) {
    for(var i=0; i<4; i++){
        var j = 1;
        while(j<4){
            if(j!=0 && board[i][j] != 0 && board[i][j-1] == 0){
                board = swapTile(i, j, i, j-1, board);
                j--;
            } else {
                j++;
            }
        }
    }

    for(var i=0; i<4; i++){
        var j=0;
        while(j<4){
            if(board[i][j] == board[i][j+1] && board[i][j] !=0){
                board = mergeTile(i, j+1, i, j, board);
            }
            j++;
        }
    }

    for(var i=0; i<4; i++){
        var j = 1;
        while(j<3){
            if(j!=0 && board[i][j] != 0 && board[i][j-1] == 0){
                board = swapTile(i, j, i, j-1, board);
                j--;
            } else {
                j++;
            }
        }
    }
    return board;
}

function moveUp(board) {
    for(var j=0; j<4; j++){
        var i =1;
        while(i<4){
            if(i != 0 && board[i][j] != 0 && board[i-1][j] == 0){
                board = swapTile(i, j, i-1, j, board);
                i--;
            } else {
                i++;
            }
        }
    }

    for(var j=0; j<4; j++){
        var i=0;
        while(i<3){
            if(board[i][j] == board[i+1][j] && board[i][j] !=0){
                board = mergeTile(i+1, j, i, j, board);
            }
            i++;
        }
    }

    for(var j=0; j<4; j++){
        var i =1;
        while(i<4){
            if(i != 0 && board[i][j] != 0 && board[i-1][j] == 0){
                swapTile(i, j, i-1, j, board);
                i--;
            } else {
                i++;
            }
        }
    }

    return board;
}

function moveDown(board) {
    for(var j=0; j<4; j++){
        var i = 2;
        while(i>=0){
            if(i!=3 && board[i][j] !=0 && board[i+1][j] == 0){
                board = swapTile(i,j,i+1,j, board);
                i++;
            } else {
                i--;
            }
        }
    }

    for(var j=0; j<4; j++){
        var i=3;
        while(i>0){
            // console.log(i);
            if(board[i][j] == board[i-1][j] && board[i][j] != 0){
                board = mergeTile(i-1, j, i, j, board);
            }
            i--;
        }
    }

    for(var j=0; j<4; j++){
        var i = 2;
        while(i>=0){
            if(i!=3 && board[i][j] !=0 && board[i+1][j] == 0){
                board = swapTile(i,j,i+1,j, board);
                i++;
            } else {
                i--;
            }
        }
    }

    return board;
}

function checkGameOverStatus(board) {
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(board[i][j] == 2048){
                return true;
            }
        }
    }
    return false;
}

rightButton.addEventListener('click', () => {
    board = moveRight(board);
    board = addRandom(board);
    console.table(board);
    showBoard(board, grid);
});

upButton.addEventListener('click', () => {
    board = moveUp(board);
    board = addRandom(board);
    console.table(board);
    showBoard(board, grid);
});

leftButton.addEventListener('click', () => {
    board = moveLeft(board);
    board = addRandom(board);
    console.table(board);
    showBoard(board, grid);
});

downButton.addEventListener('click', () => {
    board = moveDown(board);
    board = addRandom(board);
    console.table(board);
    showBoard(board, grid);
});


for(var i=0; i<16; i++){
    var value = board[Math.floor(i/4)][i%4];
    grid[i].innerHTML = value == 0 ? "" : value;
    if(value != 0){
        // grid[i].classList.remove();
        grid[i].classList.toggle(`grid-${value}`);
    } else {
        // grid[i].classList.remove();?
        // console.log(grid[i].className);
    }
}

while(isGameOn){
    if(isFull){
        isGameOn = false;
    }
    else if(checkGameOverStatus){
        isGameOn = false;
    }

    showBoard(board, grid);
}