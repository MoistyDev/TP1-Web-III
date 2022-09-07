import { getFile } from "./wordlist.js";
 

const WORDS = await getFile();
let selectedWord = chooseRandomWord();
let currentCase = 1;
let isEndOfRow = false

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * WORDS.length);
    return toString(WORDS[randomNumber]);
}

function cheatModeVerification() {
    const cheatCode = "robert";
    if (prompt("Enter cheat code ") == "robert") {
        alert("Here is the selected word : " + selectedWord);
    }
}

function updateCurrentRow() {
    for (let i = 5; i <= 30; i += 5) {
        if (currentCase == i + 1) {
            isEndOfRow = true;
            return;
        }
        isEndOfRow = false;
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function initOnScreenKBD() {
    const KEYS = document.querySelectorAll("[data-kbd-key]");
    for (const key of KEYS) {
        if (key.textContent != "ENTER" || key.textContent != "DELETE") {
            key.addEventListener("click", function(e) {
                writeLetter(key.textContent);
            });
        }
        if (key.textContent == "ENTER") {
            key.addEventListener("click", verifyAnswer);
        }
        if (key.textContent == "DELETE") {
            key.addEventListener("click", resetCase);
        }
    }
}

function writeLetter(letter) {
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    if (currentCase < 1) {
        currentCase = 1;
    }
    if (isLetter(letter) && !isEndOfRow) {
        gridCase.innerText = letter;
        ++currentCase;
        updateCurrentRow();
    }
}

function resetCase() {
    --currentCase;
    if (currentCase < 1) {
        currentCase = 1;
    }
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    gridCase.innerHTML = "&nbsp";
    updateCurrentRow();
}

function verifyAnswer() {

}

function readUserInputs() {
    let letter;
    document.addEventListener("keydown", function(e) {
        if(window.event) {                  
            letter = e.key;
            if (isLetter(letter)) {
                writeLetter(letter.toUpperCase());
                return letter;
            }
            if (letter == "Backspace") {
                resetCase();
            }
            if (letter == "Enter") {
                verifyAnswer();
            }
        }
    });
}

initOnScreenKBD();
readUserInputs();
console.log(WORDS);
