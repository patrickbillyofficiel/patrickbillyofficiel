// ONGLET LANGUES
document.querySelectorAll(".ia-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ia-tab").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    document.querySelectorAll(".ia-panel").forEach(p => p.hidden = true);
    document.getElementById(btn.dataset.target).hidden = false;
  });
});

// BOUTON ANALYSE
const analyzeBtn = document.getElementById("analyze-btn");
const loader = document.getElementById("ia-loader");
const note = document.getElementById("analysis-note");
const textarea = document.getElementById("job-offer");

analyzeBtn.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (!text) return alert("Veuillez coller une offre.");

  loader.hidden = false;
  note.hidden = true;

  setTimeout(() => {
    loader.hidden = true;
    note.hidden = false;

    analyzeFR(text);
    analyzeEN(text);
    analyzeMG(text);

    document.querySelector(".ia-panel").scrollIntoView({ behavior: "smooth" });
  }, 1000);
});

// ANALYSE FR
function analyzeFR(t) {
  document.querySelector(".summary-list-fr").innerHTML = `
    <li><strong>Match :</strong> accessibilité, RGAA, handicap.</li>
    <li><strong>Plus-value :</strong> IA appliquée, low-tech, pédagogie.</li>
    <li><strong>À préciser :</strong> rythme, autonomie, périmètre exact.</li>`;

  document.querySelector(".table-body-fr").innerHTML = `
    <tr><td>Audit</td><td>Audit RGAA complet + Accessibilité++</td><td>Compétence maîtrisée</td></tr>
    <tr><td>Handicap</td><td>Expérience terrain</td><td>Différenciant</td></tr>
    <tr><td>IA</td><td>Assistants IA métiers</td><td>Structurant pour l'entreprise</td></tr>`;
}

// ANALYSE EN
function analyzeEN(t) {
  document.querySelector(".summary-list-en").innerHTML = `
    <li><strong>Strong match:</strong> accessibility, RGAA, disability field.</li>
    <li><strong>Added value:</strong> applied AI, low-tech, training.</li>
    <li><strong>To clarify:</strong> scope, autonomy, workload.</li>`;

  document.querySelector(".table-body-en").innerHTML = `
    <tr><td>Accessibility</td><td>Complete RGAA audit + Accessibility++</td><td>High-level mastery</td></tr>
    <tr><td>Disability</td><td>Real field experience</td><td>Strong differentiator</td></tr>
    <tr><td>AI</td><td>Custom AI assistants</td><td>Useful for internal adoption</td></tr>`;
}

// ANALYSE MG
function analyzeMG(t) {
  document.querySelector(".summary-list-mg").innerHTML = `
    <li><strong>Mifanaraka tsara:</strong> fidirana nomerika, RGAA, fahasembanana.</li>
    <li><strong>Tombony:</strong> IA ampiharina, low-tech, fampiofanana.</li>
    <li><strong>Hodinihina:</strong> andraikitra, fahaleovan-tena, isan'andro.</li>`;

  document.querySelector(".table-body-mg").innerHTML = `
    <tr><td>Fidirana</td><td>AUDIT RGAA + Accessibility++</td><td>Fahaizana avo</td></tr>
    <tr><td>Fahasembanana</td><td>Traikefa eny ifotony</td><td>Mahasarika</td></tr>
    <tr><td>IA</td><td>Assistant IA manokana</td><td>Maika ho an'ny orinasa</td></tr>`;
}
