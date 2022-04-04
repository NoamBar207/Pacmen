'use strict'
const GHOST = '&#9781;';
var gGhosts;
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color:getColorCode(),
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver();
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location.i = nextLocation.i;
    ghost.location.j = nextLocation.j;
    ghost.currCellContent = nextCell;
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function ghostEaten(location){
    for(var i=0;i<gGhosts.length;i++){
        if(gGhosts[i].location.i===location.i&& gGhosts[i].location.j===location.j){
            gDeadGhost.push(gGhosts.splice(i,1)[0]);
            console.log(gDeadGhost);
        }
        renderCell(location,EMPTY)
        setTimeout(returnGhost,5000,location);
    }
}

function returnGhost(location){
    for(var i=0;i<gDeadGhost.length;i++){
    gGhosts.push(gDeadGhost.pop());
    } 
    renderCell(location,GHOST);
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}



