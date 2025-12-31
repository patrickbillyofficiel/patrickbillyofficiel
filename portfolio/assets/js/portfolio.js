(function () {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');

  function setActive(btn) {
    buttons.forEach(b => b.classList.remove('is-on'));
    btn.classList.add('is-on');
  }

  function applyFilter(tag) {
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(',').map(s => s.trim());
      const show = tag === 'tous' || tags.includes(tag);
      card.style.display = show ? '' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const tag = this.getAttribute('data-filter');
      setActive(this);
      applyFilter(tag);
    });
  });

  // default
  const first = document.querySelector('[data-filter="tous"]');
  if (first) { setActive(first); applyFilter('tous'); }
}());
