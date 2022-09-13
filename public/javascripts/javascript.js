import { getFile } from "./wordlist.js";
 

const WORDS = await getFile();
let selectedWord = chooseRandomWord();
let currentCase = 1;
let currentRow = 1;
let isEndOfRow = false

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * WORDS.length);
    return (WORDS[randomNumber].toUpperCase());
}

function cheatModeVerification() {
    const cheatCode = "robert";
    if (prompt("Enter cheat code ") == "robert") {
        alert("Here is the selected word : " + (selectedWord));
    }
}

function updateEndOfRow() {
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
        updateEndOfRow();
    }
}

function resetCase() {
    --currentCase;
    if (currentCase < 1) {
        currentCase = 1;
    }
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    gridCase.innerHTML = "&nbsp";
    updateEndOfRow();
}

function verifyAnswer() {
    if (isEndOfRow) {
        for (let i = 5; i <= 30; i += 5) {
            console.log(i);
            console.log(currentCase + "Current");
            if (i - 1 == currentCase) {
                console.log("test test");
                for (let j = 0; j <= 5; j++) {
                    const gridCase = document.querySelector('[data-grid-case="' + (i - j) + '"]');
                    gridCase.setAttribute('data-case-to-check');
                }
                const letters = document.querySelectorAll('[data-case-to-check]');
                const word = concat(letters);
                if (word == selectedWord) {
                    alert("GOOD !");
                    return true;
                }
                if (word != selectedWord) {
                    alert("Wrong !");
                    return false;
                }
            }
        }
    }
}

function verifyLetter(gridCase, gridRow) {
    let rowOfLetters = document.querySelectorAll('[data-grid-row ="' + gridRow + '"]');
    const word = selectedWord.split('');
    for (const letter of rowOfLetters) {
        if ((letter.getAttribute('[data-grid-case]')) == gridCase) {
            let selectedLetter = document.querySelector('[data-grid-case="' + gridCase + '"]');
            for (let i = 0; i <= 5; i++) {
                if (word[i] == valueOf(selectedLetter) && i == gridCase) {
                    setAsDiscovered(gridCase);
                } else if (word.includes(valueOf(selectedLetter))) {
                    setAsInTheWord();
                } else {
                    
                }
            }
        }
    }
}

function setAsDiscovered(gridcase) {
    let letter = document.querySelector('[data-grid-case="' + gridCase + '"]');
}

function setAsInTheWord() {

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
                console.log();
                verifyAnswer();
            }
        }
    });
}

initOnScreenKBD();
cheatModeVerification();
readUserInputs();
console.log(WORDS);
