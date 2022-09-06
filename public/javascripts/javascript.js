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

function initGrid() {
    const GRIDCASES = document.querySelectorAll("[data-grid-case]");
}

function writeLetter(letter) {
    const GRIDCASES = document.querySelectorAll("[data-grid-case]");

    for (const gridCase of GRIDCASES) {
        gridCase.innerText = letter;
    }
}

function resetCase() {

}

function confirmAnswer() {

}

function readUserInputs() {
    let letter;
    document.addEventListener("keydown", function(e) {
        if(window.event) {                  
            letter = e.key;
            writeLetter(letter.toUpperCase());
        }
        return letter;
    });
}

initOnScreenKBD();
readUserInputs();