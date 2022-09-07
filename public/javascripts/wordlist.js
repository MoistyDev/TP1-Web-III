export async function getFile() {
    return fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words').then(response => response.text().then(text => text.split(/\r|\n/)));
}




