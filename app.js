
function started(){
  let startAudio = new Audio('start.mp3');
  startAudio.play();
}

started();
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let winnerDiv = document.querySelector(".winner-div");
let turnO = true;

let winPatterns = [  
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

resetBtn.addEventListener("click", reset);

function reset() {
  turnO = true;
  enableBtns();
  winnerDiv.classList.add("hide");

  let resetAudio = new Audio('reset.mp3');
  resetAudio.play();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      try {
        var Oaudio = new Audio("oclick.mp3");
        Oaudio.play();
      } catch (err) {
        console.log(err);
      }
      box.innerText = "O";
      turnO = false;
    } else {
      try {
        let yaudio = new Audio("xclick.mp3");
        yaudio.play();
      } catch (err) {
        console.log(err);
      }
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;

    checkWinner();
  });
});

function checkWinner() {
  for (pattern of winPatterns) {
    let pos0 = boxes[pattern[0]].innerText;
    let pos1 = boxes[pattern[1]].innerText;
    let pos2 = boxes[pattern[2]].innerText;

    if (pos0 != "" && pos1 != "" && pos2 != "") {
      if (pos0 === pos1 && pos1 === pos2) {
        displayWinner(pos0);
      }
    }
  }
}

function displayWinner(winner) {
  setTimeout(() => {
    let winnerAudio = new Audio("winner.mp3");
    winnerAudio.play();
    winnerDiv.classList.remove("hide");
    winnerDiv.innerText = `Congradulation , winner is ${winner}`;
  }, 1000);

  disableBtns();
}

function enableBtns() {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function disableBtns() {
  for (box of boxes) {
    box.disabled = true;
  }
}
