(function(){
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if(!btn || !nav) return;

  function openNav(){
    nav.classList.add("is-open");
    btn.setAttribute("aria-expanded","true");
  }
  function closeNav(){
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded","false");
  }

  btn.addEventListener("click", ()=>{
    nav.classList.contains("is-open") ? closeNav() : openNav();
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeNav();
  });

  const mq = window.matchMedia("(min-width: 641px)");
  mq.addEventListener?.("change", ()=>{
    if(mq.matches) closeNav();
  });
})();
