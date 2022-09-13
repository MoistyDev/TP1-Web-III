import { getFile } from "./wordlist.js";

const WORDS = await getFile();
let selectedWord = chooseRandomWord();
let currentCase = 1;
let currentRow = 1;
let wordDiscovered = false;

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * WORDS.length);
    return (WORDS[randomNumber].toUpperCase());
}

function cheatModeVerification() {
    const cheatCode = "robert";
    if (prompt("Enter cheat code ") == cheatCode) {
        alert("Here is the selected word : " + (selectedWord));
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function readUserInputs() {
    let letter;
    document.addEventListener("keydown", function(e) {
        if(window.event && !wordDiscovered) {                  
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

function initOnScreenKBD() {
    const KEYS = document.querySelectorAll("[data-kbd-key]");
    for (const key of KEYS) {
        if (key.textContent != "ENTER" || key.textContent != "DELETE" && !wordDiscovered) {
            key.addEventListener("click", function(e) {
                writeLetter(key.textContent);
            });
        }
        if (key.textContent == "ENTER" && !wordDiscovered) {
            key.addEventListener("click", verifyAnswer);
        }
        if (key.textContent == "DELETE" && !wordDiscovered) {
            key.addEventListener("click", resetCase);
        }
    }
}

function writeLetter(letter) {
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    const gridRow = document.querySelectorAll('[data-grid-row]');
    if (currentCase < 1) {
        currentCase = 1;
    }
    if (isLetter(letter) && gridRow[currentCase - 1].getAttribute('data-grid-row') == currentRow) {
        gridCase.innerText = letter;
        ++currentCase;
    }
}

function resetCase() {
    const gridCase = document.querySelector('[data-grid-case="' + (currentCase - 1) + '"]');
    if (currentCase == 1) {
        gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    }
    if (gridCase.getAttribute("data-grid-row") == currentRow) {
        gridCase.innerHTML = "&nbsp";
        --currentCase;
        if (currentCase < 1) {
            currentCase = 1;
        }
    }
}

function verifyAnswer() {
    let rowOfLetters = document.querySelectorAll('[data-grid-row="' + currentRow + '"]');
    let letterToCheck = currentCase;
    let lettersMatching = 0;

    if (rowOfLetters[0].textContent != "&nbsp" && !entryIsInList(rowOfLetters)) {
        alert("Entry Unavailable.");
    }
    if (rowOfLetters[0].textContent != "&nbsp" && entryIsInList(rowOfLetters)) {
        for (let i = 6; i > 0; i--){
            lettersMatching += verifyLetter(letterToCheck, rowOfLetters, i);
            letterToCheck--;
        }
        if(lettersMatching == rowOfLetters.length) {
            wordIsDiscovered();
        }
        if (currentRow == 6 && !wordDiscovered) {
            wordIsNotDiscovered();
        }
        incrementCurrentRow();
    }
}

function incrementCurrentRow() {
    for (let i = 5; i < 30; i += 5) {
        if (currentCase == i + 1) {
            currentRow++;
        }
    }
}

function entryIsInList(rowOfLetters) {
    let word = "";
    for (const letter of rowOfLetters) {
        word += letter.textContent;
    }
    word = word.toLowerCase();
    for (let i = 0; i < WORDS.length; i++) {
        if (WORDS.includes(word)) {
            return true;
        }
        return false;
    }
}

function wordIsDiscovered() {
    alert("Congratulations ! You discovered the word.");
    wordDiscovered = true;
}

function wordIsNotDiscovered() {
    alert("Nice Try ! The word was : " + selectedWord);
}

function verifyLetter(gridCase, rowOfLetters, index) {
    const word = selectedWord.split('');
    for (const letter of rowOfLetters) {
        if ((letter.getAttribute('data-grid-case')) == gridCase) {
            let selectedLetter = document.querySelector('[data-grid-case="' + gridCase + '"]');
            if (selectedLetter.textContent == word[index - 1]) {
                matchesWord(selectedLetter);
                const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
                for (const key of keyboardKeys) {
                    if (key.getAttribute('data-kbd-key').toUpperCase() == selectedLetter.textContent) {
                        matchesWord(key);
                    }
                }
                return 1;
            } 
            if (word.includes(selectedLetter.textContent)) {
                inWord(selectedLetter);
                const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
                for (const key of keyboardKeys) {
                    if (key.getAttribute('data-kbd-key').toUpperCase() == selectedLetter.textContent) {
                        inWord(key);
                    }
                }
                return 0;
            } 
            if (word[index - 1] != selectedLetter.textContent && !word.includes(selectedLetter.textContent)) {
                notInWord(selectedLetter);
                const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
                for (const key of keyboardKeys) {
                    if (key.getAttribute('data-kbd-key').toUpperCase() == selectedLetter.textContent) {
                        notInWord(key);
                    }
                }
                return 0;
            }
        }
    }
    return 0;
}

function notInWord(selectedLetter) {
    selectedLetter.classList.add("notInTheWord");
}

function inWord(selectedLetter) {
    selectedLetter.classList.add("isInTheWord");
}

function matchesWord(selectedLetter) {
    selectedLetter.classList.add("matches");
}

function refreshGrid() {
    const refreshButton = document.querySelector('[data-refresh-icon]');
    refreshButton.addEventListener("click", function(e) {
        const gridCases = document.querySelectorAll('[data-grid-case]');
        for (const gridCase of gridCases) {
            gridCase.innerHTML = "&nbsp";
            gridCase.classList.remove("matches");
            gridCase.classList.remove("isInTheWord");
            gridCase.classList.remove("notInTheWord");
        }
        const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
        for (const key of keyboardKeys) {  
            key.classList.remove("matches");
            key.classList.remove("isInTheWord");
            key.classList.remove("notInTheWord");
        }
        selectedWord = chooseRandomWord();
        currentCase = 1;
        currentRow = 1;
        wordDiscovered = false;
    });
}

initOnScreenKBD();
cheatModeVerification();
readUserInputs();
refreshGrid();
