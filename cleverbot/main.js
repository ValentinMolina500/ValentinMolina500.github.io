var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
var synth = window.speechSynthesis;
var voices = synth.getVoices();
var url =   "https://www.cleverbot.com/getreply";
var API_KEY = "CC8srKyiHqx77hURUxkjduSJnCw";
var cs = '';
var textContainer = document.getElementById('mainText');
var button = document.getElementById('speakCuh');
var wait = document.getElementById('wait');

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;
button.onclick = startMic();

recognition.onresult = function(event) {
    wait.style.display = "none";
    var response = event.results[0][0].transcript
    console.log('You said: ', response);
    var text = document.createElement("p")
    text.innerHTML = response;
    textContainer.appendChild(text);

    var input = encodeURIComponent(response);

    $.ajax({
        url: url,
        data: {"input": input, "key": API_KEY, "cs": cs},
        dataType: "json",
        success: ProcessReply
    });
}

function ProcessReply(reply) {
    console.log(reply)
    cs = reply.cs;
    var utterThis = new SpeechSynthesisUtterance(reply.output);
    console.log(synth.getVoices());
    var cleverOutput = document.createElement("p");
    cleverOutput.innerHTML = reply.output;
    utterThis.voice = voices[5];
    synth.speak(utterThis);

    textContainer.appendChild(cleverOutput);
}

function startMic() {
    recognition.start();
    wait.style.display = "inline";
}