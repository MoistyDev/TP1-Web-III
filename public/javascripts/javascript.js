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

initOnScreenKBD();