// ===== MODULE VOIX PATRICK BILLY =====

// --- Synthèse vocale (lecture) ---
const synth = window.speechSynthesis;

function readText(text, lang = 'fr-FR') {
  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 1; // vitesse
  utter.pitch = 1;

  synth.cancel();
  synth.speak(utter);
}

document.getElementById("voice-read-btn").addEventListener("click", () => {
  const activePanel = document.querySelector(".ia-panel:not([hidden])");
  if (!activePanel) return;

  const text = activePanel.innerText.trim();

  let lang = "fr-FR";
  if (activePanel.id === "ia-en") lang = "en-US";
  if (activePanel.id === "ia-mg") lang = "mg-MG"; // fallback automatique → FR

  readText(text, lang);
});

document.getElementById("voice-stop-btn").addEventListener("click", () => {
  synth.cancel();
});

// --- Reconnaissance vocale (dictée) ---

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognizing = false;

document.getElementById("voice-dictate-btn").addEventListener("click", () => {
  if (!window.SpeechRecognition) {
    alert("Reconnaissance vocale non supportée sur ce navigateur.");
    return;
  }

  const recog = new SpeechRecognition();
  recog.lang = "fr-FR";
  recog.interimResults = false;

  recog.start();
  recognizing = true;

  document.getElementById("voice-dictate-btn").textContent = "🎤 En cours...";

  recog.onresult = (event) => {
    const result = event.results[0][0].transcript;
    document.getElementById("job-offer").value += "\n" + result;
  };

  recog.onend = () => {
    recognizing = false;
    document.getElementById("voice-dictate-btn").textContent = "🎤 Dicter une offre";
  };
});
