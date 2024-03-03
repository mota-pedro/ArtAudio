chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'play-pause':
            speakContent();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

function speakContent() {
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

