let currentCase = 1;

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
            key.addEventListener("click", confirmAnswer);
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
    if (isLetter(letter)) {
        gridCase.innerText = letter;
        ++currentCase;
    }
}

function resetCase() {
    --currentCase;
    if (currentCase < 1) {
        currentCase = 1;
    }
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    gridCase.innerHTML = "&nbsp";
    
}

function confirmAnswer() {

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
                confirmAnswer();
            }
        }
    });
}

initOnScreenKBD();
readUserInputs();