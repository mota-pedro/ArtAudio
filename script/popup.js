const textInput = document.getElementById('text-input');
const copyButton = document.getElementById('copy-button');
const readButton = document.getElementById('read-button');

copyButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function copyText() {
            const pageText = document.body.innerText;
            chrome.storage.local.set({ 'pageText': pageText});
            console.log(pageText);
        };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: copyText
        });
    });

    chrome.storage.local.get('pageText', (data) => {
        const content = data.pageText;
        chrome.tts.speak(content);
    })
});
