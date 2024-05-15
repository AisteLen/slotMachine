const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍌'];
const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const playerMoney = document.getElementById("playerMoney");

const slots = [
    Array.from(document.querySelectorAll(".num1")),
    Array.from(document.querySelectorAll(".num2")),
    Array.from(document.querySelectorAll(".num3"))
];

let moneyResult = 500;
playerMoney.innerText = "Money: " + moneyResult;

button.onclick = () => {
    let bidAmount = Number(input.value.trim());
    if (bidAmount <= 0) {
        alert("You have to bid more than that!");
    } else if (moneyResult - bidAmount < 0) {
        alert("You don't have enough money!");
    } else {
        moneyResult -= bidAmount;
        playerMoney.innerText = "Money: " + moneyResult;
        input.value = "";
        spinSlots(bidAmount);
    }
};

function spinSlots(bidAmount) {
    const results = [[], [], []];

    for (let i = 0; i < 3; i++) {
        let shuffledSymbols = shuffleArray([...symbols]);
        slots[i].forEach((slot, index) => {
            results[i].push(shuffledSymbols[index]);
            slot.innerText = shuffledSymbols[index];
        });
    }
    setTimeout(() => {
        checkResults(results, bidAmount);
    }, 500);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkResults(results, bidAmount) {
    if (results[0][1] === results[1][1] && results[1][1] === results[2][1]) {
        moneyResult += bidAmount * 5;
        setTimeout(() => {
            alert("Jackpot! You win " + (bidAmount * 5) + " money!");
        }, 500);
    } else if (results[0][1] === results[1][1] || results[1][1] === results[2][1] || results[0][1] === results[2][1]) {
        moneyResult += bidAmount * 2;
        setTimeout(() => {
            alert("You win " + (bidAmount * 2) + " money!");
        }, 500);
    }
    playerMoney.innerText = "Money: " + moneyResult;
}
