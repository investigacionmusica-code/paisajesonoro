const samples = [
  "Bus.wav", "Bus2.wav", "Freno.wav", "Freno2.wav", "Manguera.wav", "Manguera2.wav", "Manguera3.wav",
  "Moto.wav", "Moto2.wav", "Moto3.wav", "Moto4.wav", "Moto5.wav", "MotoEstereo.wav", "Motor+freno.wav",
  "Motor.wav", "Motor2.wav", "Motor3.wav", "Motor4.wav", "Motor5.wav", "Motos.wav", "Musica remontada.wav",
  "Musica.wav", "ObjArrastrado.wav", "Pitos.wav", "Pitos2.wav", "Pitos3.wav", "Pitos4.wav", "Risa.wav",
  "Ritmo.wav", "Ritmo2.wav", "Rueda.wav", "Ruedas2.wav", "Ruido.wav", "Silbido.wav", "Voces.wav",
  "Voz.wav", "Voz2.wav", "Voz3.wav", "Voz4.wav"
];

const keyboard = document.querySelector("#keyboard");
const nowPlaying = document.querySelector("#now-playing");
const sampleCount = document.querySelector("#sample-count");
const keyMap = "asdfghjklqwertyuiopzxcvbnm,.;/123456789";
const mainSamples = samples;
const blackNotes = new Set([1, 3, 6, 8, 10]);
const keyButtons = [];

sampleCount.textContent = mainSamples.length;

function displayName(filename) {
  return filename.replace(/\.wav$/i, "");
}

function playSample(filename, button) {
  const audio = new Audio(encodeURI(filename));
  audio.volume = 0.9;
  audio.play().catch(() => {
    nowPlaying.textContent = "Haz click para activar el sonido";
  });
  nowPlaying.textContent = displayName(filename);
  if (button) {
    button.classList.add("active");
    window.setTimeout(() => button.classList.remove("active"), 180);
  }
}

mainSamples.forEach((filename, index) => {
  const button = document.createElement("button");
  const note = index % 12;
  const isBlack = blackNotes.has(note);
  const whitePosition = mainSamples.slice(0, index).filter((_, noteIndex) => !blackNotes.has(noteIndex % 12)).length;
  button.className = `key ${isBlack ? "black-key" : "white-key"}`;
  button.type = "button";
  button.dataset.key = keyMap[index];
  button.style.setProperty("--white-position", whitePosition);
  button.setAttribute("aria-label", `Reproducir ${displayName(filename)}`);
  button.innerHTML = `<span class="key-index">${String(index + 1).padStart(2, "0")}</span><span class="key-name">${displayName(filename)}</span><span class="key-shortcut">${keyMap[index]}</span>`;
  button.addEventListener("pointerdown", () => playSample(filename, button));
  keyboard.appendChild(button);
  keyButtons.push(button);
});

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  const index = keyMap.indexOf(event.key.toLowerCase());
  if (index === -1 || index >= mainSamples.length) return;
  const button = keyButtons[index];
  playSample(mainSamples[index], button);
});
git status
