'use strict'
const PACMAN = '😷';
var gPacman;
var gColors = [];
var gDeadGhost = [];
var gPrevSuper = null;
var isSuperFoodbeSaved = false;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev);
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)
    console.log(nextCell)

    // return if cannot move
    if (nextCell === WALL) return

    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper === false) {
            gameOver();
        } else {
            ghostEaten(nextLocation);
        }
    }
    if (nextCell === CHERRY) {
        console.log("HEREEE")
        updateScore(10);
    }
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodEat++;
        // console.log(gFoodCount, "foodCounter")
        // console.log(gFoodEat, "Fodd Eatead")
        if (gFoodCount === gFoodEat) gameOver();
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) {
            return
        } else {
            superFood();

        }
    }


    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    ///////
    // if (isSuperFoodbeSaved && gPrevSuper === SUPER_FOOD) {
    //     gBoard[gPacman.location.i][gPacman.location.j] = SUPER_FOOD;
    //     renderCell(gPacman.location, SUPER_FOOD);
    //     isSuperFoodbeSaved = false;
    // }


    //////////////

    // Move the pacman to new location
    // update the model
    gPacman.location.i = nextLocation.i;
    gPacman.location.j = nextLocation.j;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

function colorBack() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = gColors[i];
    }
    gPacman.isSuper = false;
    isSuperFoodbeSaved = false;
    gPrevSuper = false;
}


function superFood() {
    if (!gPacman.isSuper) {

        gPacman.isSuper = true;
        for (var i = 0; i < gGhosts.length; i++) {
            gColors.push(gGhosts[i].color);
            gGhosts[i].color = 'Yellow';
        }
        setTimeout(colorBack, 5000);
        // @@@@@@@@@@@@@@@@@
    }
}