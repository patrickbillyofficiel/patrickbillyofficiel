/* lang-switch.js
   Changement de langue intelligent
   Patrick Billy – RGAA+++++
*/
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const switchLinks = document.querySelectorAll(".lang-switch a");

    if (!switchLinks.length) return;

    const pathParts = window.location.pathname.split("/").filter(Boolean);
    // Ex: ["lang", "fr", "bio.html"]

    if (pathParts.length < 2) return;

    const currentLang = pathParts[1];
    const currentPage = pathParts[2] || "index.html";

    switchLinks.forEach(function (link) {
      const targetLang = link.getAttribute("data-lang");
      if (!targetLang) return;

      const newPath = "/lang/" + targetLang + "/" + currentPage;
      link.setAttribute("href", newPath);

      // Accessibilité : indiquer la langue courante
      if (targetLang === currentLang) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  });
})();
