const imageBaseUrls = {
    easy: "path/to/cut/easy", // Directory with cut images
    normal: "path/to/cut/normal",
    hard: "path/to/cut/hard"
};

var rows = 5;
var columns = 5;
var pieces = [];
var currTile;
var otherTile;
var turns = 0;

const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get('imageId') || 'easy1'; // Default to 'easy1' if imageId is not found
const level = imageId.split(/(\d+)/)[0]; // Get the level from the imageId
const imageBaseUrl = imageBaseUrls[level] || imageBaseUrls['easy']; // Fallback to 'easy' level if level is invalid

window.onload = function() {
    initializeBoard();
    shufflePieces();
    createPieces();

    document.getElementById("changeBtn").addEventListener("click", function() {
        changePuzzleImage();
    });
}

function initializeBoard() {
    clearBoard();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = `${imageBaseUrl}/blank2.jpg`; // Ensure that this path is correct

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
    pieces.sort(() => Math.random() - 0.5); // Shuffle array
}

function createPieces() {
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = `${imageBaseUrl}/${pieces[i]}.jpg`; // Ensure that this path is correct

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
    if (!currTile || !otherTile || currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

function changePuzzleImage() {
    clearPieces();
    shufflePieces();
    initializeBoard();
    createPieces();
}
