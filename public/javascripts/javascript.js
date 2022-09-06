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

}

function resetCase() {

}

function confirmAnswer() {

}

function readUserInputs() {
    let letter;
    document.addEventListener("keypress", function(e) {
        if(window.event) {                  
            letter = e.keyCode;
        } else if(e.which){                
            letter = e.which;
        }

        return letter;
    });
}

initOnScreenKBD();