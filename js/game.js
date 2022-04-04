'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '@'
const CHERRY = '🍒'

var gIntervalCherry;
var gFoodEat= 0;
var gFoodCount=0;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gFoodEat= 0;
    gIntervalCherry=setInterval(Cherry,5000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
             board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            else if(i===1&&j===1||i===1&&j===SIZE-2||i===SIZE-2&&j===1||i===SIZE-2&&j==SIZE-2){
                board[i][j]=SUPER_FOOD;
            }else gFoodCount++;
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    if(diff===0){
        gGame.score=0;
    }else gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function gameOver() {
    console.log('Game Over');
    gameOverModal();
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);

}

function gameOverModal(){
    var elModal=document.querySelector('.modal');
    var elMsg=document.querySelector('.msg');
    elMsg.style.display=''
    if(gFoodCount===gFoodEat){
         elMsg.innerText = 'You Won!!! :) Wanna Play Again?'
    }else elMsg.innerText = 'You Lost :( Wanna Play Again?'
   
     elModal.innerHTML = `<button class="btn" onclick=resetBtn()>Reset</button>`
}

function resetBtn(){
    var elMsg=document.querySelector('msg');
    elMsg.style.display= 'none'
    
    updateScore(0);
    gFoodCount=0;
    init();
}

function Cherry(){
    var emptyPlace=[];
    for(var i=1;i<gBoard.length-1;i++){
        for(var j=1;j<gBoard[i].length-1;j++){
            if(gBoard[i][j]=== EMPTY){
                emptyPlace.push({i,j});
            }
        }
    }
    var randI= getRandomIntInclusive(0,emptyPlace.length-1);
    console.log(emptyPlace[randI])
    gBoard[emptyPlace[randI].i][emptyPlace[randI].j] = CHERRY;
    renderCell(emptyPlace[randI],CHERRY);
}

