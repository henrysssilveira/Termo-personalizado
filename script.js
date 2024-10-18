function aleatoridades(){
    var palavras = ['CAIXA','MOTOR','PORTA','TENDA','PAULO']
    var resultado = palavras[Math.floor(Math.random() * 5)]
    return resultado
}

var solution = aleatoridades();
let currentGuess = "";
let currentRow = 0;

const keys = document.querySelectorAll(".key");
const grid = document.querySelector(".grid");
const rows = document.querySelectorAll(".row");

keys.forEach(key => {
    key.addEventListener("click", () => handleKey(key.textContent));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleKey("ENTER");
    } else if (event.key === "Backspace") {
        handleKey("⌫");
    } else {
        handleKey(event.key.toUpperCase());
    }
});

function handleKey(keyValue) {
    if (keyValue === "ENTER") {
        if (currentGuess.length === 6) {
            checkGuess();
        }
    } else if (keyValue === "⌫") {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateGrid();
        }
    } else {
        if (currentGuess.length < 6 && /^[A-Z-Ã]$/.test(keyValue)) {
            currentGuess += keyValue;
            updateGrid();
        }
    }
}

function updateGrid() {
    const row = rows[currentRow];
    const cells = row.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
        cell.textContent = currentGuess[index] || "";
    });
}

function checkGuess() {
    const row = rows[currentRow];
    const cells = row.querySelectorAll(".cell");

    if (currentGuess === solution) {
        cells.forEach(cell => {
            cell.style.backgroundColor = "#43a495";
        });
    } else {
        cells.forEach((cell, index) => {
            if (solution[index] === currentGuess[index]) {
                cell.style.backgroundColor = "#43a495";
            } else if (solution.includes(currentGuess[index])) {
                cell.style.backgroundColor = "#d3ab6e";
            } else {
                cell.style.backgroundColor = "#312a2c";
            }
        });

        if (currentRow < 6) {
            currentRow++;
            currentGuess = "";
        } else {
            alert("Você atingiu o limite de tentativas. A palavra era: " + solution);
        }
    }
}
