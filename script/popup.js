const readButton = document.getElementById('read-button');

let isAllowed = chrome.extension.isAllowedFileSchemeAccess();

readButton.addEventListener('click', () => {
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
});
