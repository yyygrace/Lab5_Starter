// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const horn = document.getElementById('horn-select');
  const hornImg = document.querySelector("img");
  const audio = document.getElementsByClassName("hidden");
  const button = document.querySelector("button");
  const slider = document.getElementById("volume");
  const volumeImg = document.querySelector("#volume-controls img");
  const jsConfetti = new JSConfetti();

  horn.addEventListener("input", function() {
    const hornType = horn.value;
    if(hornType==="air-horn"){
      hornImg.src='assets/images/air-horn.svg';
      hornImg.alt = 'air-horn';
      audio.src = 'assets/audio/air-horn.mp3';
    }
    else if(hornType==="car-horn"){
      hornImg.src='assets/images/car-horn.svg';
      hornImg.alt = 'car-horn';
      audio.src = 'assets/audio/car-horn.mp3';
    }
    else if(hornType==="party-horn"){
      hornImg.src='assets/images/party-horn.svg';
      hornImg.alt = 'party-horn';
      audio.src = 'assets/audio/party-horn.mp3';
    }  
  }) 

  slider.addEventListener("change", function() {
    const volume = parseInt(slider.value);
    if(volume === 0){
      volumeImg.src = 'assets/icons/volume-level-0.svg';
    }
    else if(volume >= 1 && volume < 33){
      volumeImg.src = 'assets/icons/volume-level-1.svg';
    }
    else if(volume >= 33 && volume < 67){
      volumeImg.src = 'assets/icons/volume-level-2.svg';
    }
    else if(volume >= 67){
      volumeImg.src = 'assets/icons/volume-level-3.svg';
    }
  })

  button.addEventListener("click", function() {
    const sound = new Audio(audio.src);
    sound.volume = slider.value / 100;

    if(horn.value === "party-horn"){
      jsConfetti.addConfetti();
    }
    sound.play();
  })
}