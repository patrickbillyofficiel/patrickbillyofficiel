// cv-ia.js
(function () {
  const analyzeBtn = document.getElementById('analyze-btn');
  const jobOfferTextarea = document.getElementById('job-offer');
  const loader = document.getElementById('ia-loader');
  const note = document.getElementById('analysis-note');

  const summaryFR = document.querySelector('.summary-list-fr');
  const summaryEN = document.querySelector('.summary-list-en');
  const summaryMG = document.querySelector('.summary-list-mg');

  const tableFR = document.querySelector('.table-body-fr');
  const tableEN = document.querySelector('.table-body-en');
  const tableMG = document.querySelector('.table-body-mg');

  const tabs = document.querySelectorAll('.ia-tab');
  const panels = document.querySelectorAll('.ia-panel');

  // --- GESTION ONGLET FR / EN / MG ---
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach(p => {
        if (p.id === targetId) {
          p.hidden = false;
        } else {
          p.hidden = true;
        }
      });
    });
  });

  // --- FONCTION "ANALYSE" SIMULÉE ---
  function simulateAnalysis(text) {
    const trimmed = (text || '').trim();
    const isEmpty = trimmed.length === 0;

    // Petit résumé simple selon qu'il y a du texte ou pas
    const frSummary = isEmpty
      ? [
          "Aucune offre collée : exemple générique affiché.",
          "Match fort sur : accessibilité, RGAA, terrain handicap, low-tech.",
          "Plus-value : IA appliquée, pédagogie, dimension France / Madagascar."
        ]
      : [
          "Offre analysée : profil très proche des besoins exprimés.",
          "Match fort sur : accessibilité, accompagnement, outils low-tech.",
          "Plus-value : IA appliquée, travail avec publics fragiles, formats offline."
        ];

    const enSummary = isEmpty
      ? [
          "No job offer pasted: showing a generic example.",
          "Strong match on: accessibility, RGAA/WCAG, low-tech tools.",
          "Extra value: applied AI, pedagogy, France/Madagascar experience."
        ]
      : [
          "Job offer analysed: profile strongly aligned with stated needs.",
          "Strong match on: accessibility, support, low-tech/offline tools.",
          "Extra value: applied AI, vulnerable users, real field experience."
        ];

    const mgSummary = isEmpty
      ? [
          "Tsy mbola nisy tolotra asa nalefa: ohatra ankapobeny aloha.",
          "Mifanaraka tsara amin'ny: fidirana nomerika, RGAA, fitaovana low-tech.",
          "Fanampiny: IA ampiharina, pédagogie, traikefa Frantsa/Madagasikara."
        ]
      : [
          "Efa nodinihina ny tolotra: tena akaiky ny mombamomba.",
          "Mifanaraka amin'ny: fidirana, fanohanana, fitaovana offline.",
          "Fanampiny: IA ampiharina, olona marefo, traikefa eny ifotony."
        ];

    // Remplir les listes
    function fillList(ul, items) {
      if (!ul) return;
      ul.innerHTML = '';
      items.forEach(txt => {
        const li = document.createElement('li');
        li.textContent = txt;
        ul.appendChild(li);
      });
    }

    fillList(summaryFR, frSummary);
    fillList(summaryEN, enSummary);
    fillList(summaryMG, mgSummary);

    // Tableaux très simples
    function fillTable(tbody, rows) {
      if (!tbody) return;
      tbody.innerHTML = '';
      rows.forEach(r => {
        const tr = document.createElement('tr');
        r.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }

    const baseRowsFR = [
      [
        "Accessibilité numérique (RGAA / WCAG)",
        "Audit + Accessibilité++ (voix, IA, terrain)",
        "Compétence couverte, au-delà du minimum légal."
      ],
      [
        "Accompagnement d'équipes",
        "Formations courtes, supports simples, Mini-WTD",
        "Facilite l'appropriation, pas seulement la conformité."
      ]
    ];

    const baseRowsEN = [
      [
        "Digital accessibility (RGAA / WCAG)",
        "Audits + Accessibilité++ (voice, AI, field)",
        "Skill covered, beyond legal minimum."
      ],
      [
        "Team support",
        "Short trainings, simple materials, Mini-WTD",
        "Helps ownership, not only compliance."
      ]
    ];

    const baseRowsMG = [
      [
        "Fidirana nomerika (RGAA / WCAG)",
        "Fanombanana + Accessibilité++ (feon'aina, IA, zava-misy)",
        "Fahaizana ampy, mihoatra ny fepetra ofisialy."
      ],
      [
        "Fanohanana ekipa",
        "Fampiofanana fohy, fitaovana tsotra, Mini-WTD",
        "Manamora ny fandraisan'andraikitra, tsy hoe taratasy fotsiny."
      ]
    ];

    fillTable(tableFR, baseRowsFR);
    fillTable(tableEN, baseRowsEN);
    fillTable(tableMG, baseRowsMG);
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      if (loader) loader.hidden = false;
      if (note) note.hidden = true;

      window.setTimeout(() => {
        simulateAnalysis(jobOfferTextarea ? jobOfferTextarea.value : '');
        if (loader) loader.hidden = true;
        if (note) note.hidden = false;
      }, 600);
    });
  }

  // --- MODULE VOIX SIMPLE (lecture du résumé de l’onglet actif) ---
  const speakBtn = document.getElementById('speak-btn');
  const voiceNote = document.getElementById('voice-note');

  function getActiveSummaryText() {
    const activeTab = document.querySelector('.ia-tab.is-active');
    if (!activeTab) return '';

    const target = activeTab.getAttribute('data-target');
    let list = null;

    if (target === 'ia-fr') list = summaryFR;
    if (target === 'ia-en') list = summaryEN;
    if (target === 'ia-mg') list = summaryMG;

    if (!list) return '';

    return Array.from(list.querySelectorAll('li'))
      .map(li => li.textContent.trim())
      .join('. ');
  }

  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        if (voiceNote) {
          voiceNote.textContent = "La synthèse vocale n’est pas supportée par ce navigateur.";
        }
        return;
      }

      const text = getActiveSummaryText();
      if (!text) {
        if (voiceNote) {
          voiceNote.textContent = "Rien à lire pour le moment. Lancez d’abord une analyse.";
        }
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      const activeTab = document.querySelector('.ia-tab.is-active');
      const target = activeTab ? activeTab.getAttribute('data-target') : 'ia-fr';

      if (target === 'ia-en') utterance.lang = 'en-GB';
      else if (target === 'ia-mg') utterance.lang = 'fr-FR'; // pas de voix MG dédiée, on lit en FR
      else utterance.lang = 'fr-FR';

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      if (voiceNote) {
        voiceNote.textContent = "Lecture en cours…";
      }

      utterance.onend = () => {
        if (voiceNote) voiceNote.textContent = "Lecture terminée.";
      };
    });
  }
})();
