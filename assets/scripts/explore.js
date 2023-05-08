// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const select = document.getElementById("voice-select");
  const button = document.querySelector("button");
  const tts = document.getElementById("text-to-speak")
  const image = document.querySelector("img");


  function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }

    const voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      select.appendChild(option);
    }
  }

  populateVoiceList();
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener("click", function () {
    const utterThis = new SpeechSynthesisUtterance(tts.value);
    const voices = speechSynthesis.getVoices();
    const selectedOption = select.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    tts.blur();

    if (synth.speaking) {
      image.src = 'assets/images/smiling-open.png';
    }

    utterThis.addEventListener("end", function () {
      image.src = 'assets/images/smiling.png';
    })
  })
}