var rows = 5;
var columns = 5;
var pieces = [];

var currTile;
var otherTile;
var turns = 0;

var imageUrls = ["./Images/Normal/Images-1/", "./Images/Normal/Images-2/", "./Images/Normal/Images-2/"];
var currentImageUrlIndex = 0;

window.onload = function() {
    initializeBoard();
    shufflePieces();
    createPieces();

    function changePuzzleImage() {
        clearPieces();
        shufflePieces();
        initializeBoard();
        createPieces();
    }

    document.getElementById("changeBtn").addEventListener("click", function() {
        currentImageUrlIndex = (currentImageUrlIndex + 1) % imageUrls.length;
        changePuzzleImage();
    });


}

function initializeBoard() {
    clearBoard();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./Images/Normal/Images-1/blank2.jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function shufflePieces() {
    pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }
}

function createPieces() {
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = imageUrls[currentImageUrlIndex] + pieces[i] + ".jpg";

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

function clearBoard() {
    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function clearPieces() {
    let piecesContainer = document.getElementById("pieces");
    while (piecesContainer.firstChild) {
        piecesContainer.removeChild(piecesContainer.firstChild);
    }

}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

function showGameOptions(rows, columns) {
    // Створюємо поле гри з вказаними рядками та стовпцями
    clearBoard();
    clearPieces();
    createGameBoard(rows, columns);
}

function createGameBoard(rows, columns) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./Images/Normal/Images-1/blank2.jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function clearGame() {
    clearBoard();
    clearPieces();
}
