var speaking = false;
var speed = 1.0;

chrome.tts.speak(
    "Comandos: Alt + Á: Abrir ou fechar extensão; Alt + P: Ler página ou pausar leitura; Alt + Seta para cima: Aumentar velocidade; Alt + Seta para baixo: Diminuir Velocidade"
    )

chrome.commands.onCommand.addListener(function (command) {
    if (command === 'play-pause' && speaking === false) {
        speakContent();
    } else if (command === 'play-pause' && speaking === true) {
        stopSpeaking();
    } else if (command === 'increase-speed') {
        increaseSpeed();
    } else if (command === 'decrease-speed') {
        decreaseSpeed();
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
        chrome.tts.speak(content, {'rate': speed});
    });

};

function stopSpeaking() {

    speaking = false;
    chrome.tts.stop();

}

function increaseSpeed() {

    if (speed < 2.0) {
        speed++;
    }
    speakContent();
}

function decreaseSpeed() {

    if (speed === 1.0) {
        speed= 0.5;
    } else {
        speed--;
    }
    speakContent();

}

