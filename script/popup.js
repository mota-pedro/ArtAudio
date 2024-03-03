var speaking = false;

chrome.commands.onCommand.addListener(function (command) {
    if (command === 'play-pause' && speaking === false) {
        speakContent();
    } else if (command === 'play-pause' && speaking === true) {
        stopSpeaking();
    } else {
        console.log(`Command ${command} not found`);
    }
});

function speakContent() {

    speaking = true;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function copyText() {
            const pageText = document.body.innerText;
            chrome.runtime.sendMessage(pageText);
            console.log(pageText);
        };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: copyText
        });
    });

    chrome.runtime.onMessage.addListener((data) => {
        const content = data;
        chrome.tts.speak(content);
    });

};

function stopSpeaking() {

    speaking = false;
    chrome.tts.stop();

}

