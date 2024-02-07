const textInput = document.getElementById('text-input');
const readButton = document.getElementById('read-button');

readButton.addEventListener('click', readText);

function readText() {
    chrome.tts.speak(textInput.value);
}
