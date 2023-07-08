let title = document.getElementById("title")
let maxNumObj = document.getElementById("maxNum");
let numLabel = document.getElementById("numLabel");
let msgLabel = document.getElementById("msgLabel");
let startBtn = document.getElementById("startBtn");

let maxNum = 0, guessedNum = 0, inGame = 0, attempts = 0;
const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

startBtn.addEventListener("click", () => {
    if (!inGame) {
        startGame();
    } else if (inGame == 1) {
        playGame();
    } else {
        resetGame();
    }
});


function startGame() {
    maxNum = parseInt(maxNumObj.value);
    if (!maxNum) {
        setText(msgLabel, "Please enter a number")
    } else {
        msgLabel.innerText = "";
        console.log(`Max num is ${maxNum}`);
        guessedNum = Math.floor(Math.random() * maxNum) + 1;
        console.log(`Guessed num is ${guessedNum}`);
        inGame = 1;
        maxNumObj.value = "";
        numLabel.innerText = "Guess the number !!";
        startBtn.innerText = "Guess";
    }
}

function playGame() {
    let userNum = parseInt(maxNumObj.value);

    if (!userNum) {
        setText(msgLabel, "Please enter a number")
    } else {
        attempts++;
        console.log(`guessed num is ${guessedNum}`);
        console.log(`user guessed num is ${userNum}`);

        if (userNum === guessedNum) {
            inGame = 2;
            title.innerText = "CONGRATULATIONS !!"
            numLabel.innerText = `You win !!`;
            setText(msgLabel, `You successfully guessed the number in ${attempts} attempts`);
            startBtn.innerText = "Play again";
            // confetti({
            //   particleCount: 100,
            //   spread: 70,
            //   origin: { y: 0.6 },
            // });
            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });

            fire(0.2, {
                spread: 60,
            });

            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
            });

            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
            });

            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        } else if (userNum >= guessedNum) {
            setText(msgLabel, `You are thinking too much...`);
        } else {
            setText(msgLabel, `You are thinking too low...`);
        }
        maxNumObj.value = "";
    }
}

function resetGame() {
    maxNum = 0, guessedNum = 0, inGame = 0, attempts = 0;
    title.innerText = "GUESS IT"
    numLabel.innerText = "Enter the max limit";
    msgLabel.innerText = "";
    startBtn.innerText = "Play";
}

function setText(e, text) {
    e.classList.add("response");
    e.innerText = text;
    setTimeout(function () {
        e.classList.remove("response");
    }, 400);
}

function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        })
    );
}

// for enter
window.addEventListener('keydown', function (e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
        if (e.target.nodeName == 'INPUT' && e.target.type == 'number') {
            e.preventDefault();
            return false;
        }
    }
}, true);