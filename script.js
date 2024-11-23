let boxes = document.querySelectorAll(".boxes");
let turn1 = document.querySelector(".turn1");
let turn2 = document.querySelector(".turn2");
let msg = document.querySelector(".msg");
let span = document.querySelector("#result");
let reset = document.getElementById("reset");
let ng = document.getElementById("ng");
let turnX = true;
let clickSound = new Audio("click.wav");
let winnerSound = new Audio("winning.mp3");

let WinnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover");
        box.classList.remove("b-s", "b-s1");
        box.style.color = "";
    });
    msg.classList.add("hide");
    turnX = true;
    turn1.classList.add("b-s1");
    turn2.classList.remove("b-s1", "b-s");
}

reset.addEventListener("click", resetGame);
ng.addEventListener("click", resetGame);

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting
        clickSound.play();
        if (turnX) {
            box.innerText = "X";
            box.style.color = "rgb(174, 51, 96)";
            turn2.classList.add("b-s1");
            turn1.classList.remove("b-s1", "b-s");
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "rgb(17, 52, 182)";
            turn1.classList.add("b-s");
            turn2.classList.remove("b-s", "b-s1");
            turnX = true;
        }
        box.disabled = true; // Disable the box after a move
        checkWinner();
    });
});

function checkWinner() {
    for (let condition of WinnerCondition) {
        let box1 = boxes[condition[0]].innerText;
        let box2 = boxes[condition[1]].innerText;
        let box3 = boxes[condition[2]].innerText;
        if (box1 !== "" && box2 !== "" && box3 !== "") {
            if (box1 === box2 && box2 === box3) {
                showResult(box1);
                winnerSound.play();
                condition.forEach(index => {
                    if (box1 === "X") {
                        boxes[index].classList.add("b-s");
                        boxes[index].style.color = "rgb(174, 51, 96)";
                    } else {
                        boxes[index].classList.add("b-s1");
                        boxes[index].style.color = "rgb(17, 52, 182)";
                    }
                });
                boxes.forEach(box => box.disabled = true); // Disable all boxes after win
                return;
            }
        }
    }
}

function showResult(result) {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.remove("hover");
    });
    msg.classList.remove("hide");
    span.innerText = result;
    span.style.color = result === "X" ? "rgb(174, 51, 96)" : "rgb(17, 52, 182)";
}

resetGame();
