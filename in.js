var rows = 5;
var columns = 5;
var pieces = [];

var currTile;
var otherTile;
var turns = 0;

var imageUrls = ["./images/","./images/Images-1/", "./images/Images-2/"];
var currentImageUrlIndex = 0;



window.onload = function() {
    initializeBoard();
    shufflePieces();
    createPieces();

   // Функція для зміни зображення пазлу при натисканні на кнопку
function changePuzzleImage() {
    clearPreviousPuzzles(); // Очистити попередні пазли
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = imageUrls[currentImageUrlIndex] + pieces[i] + ".jpg";

        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}


    // Додати подію на кнопку для зміни зображення пазлу
    document.getElementById("changeBtn").addEventListener("click", function() {
        currentImageUrlIndex = (currentImageUrlIndex + 1) % imageUrls.length;
        changePuzzleImage();
    });
}

function initializeBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank2.jpg";

            // DRAG FUNCTIONALITY
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

        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

function clearPreviousPuzzles() {
    document.getElementById("pieces").innerHTML = "";
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
