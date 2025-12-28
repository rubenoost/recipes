// Theme Toggle
(function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  setTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// Search
(function() {
  const toggle = document.querySelector('.search-toggle');
  const overlay = document.getElementById('search-overlay');
  const closeBtn = document.querySelector('.search-close');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const searchIndexUrl = document.body.dataset.searchIndex;
  let fuse = null;

  if (searchIndexUrl) {
    fetch(searchIndexUrl)
      .then(res => res.json())
      .then(data => {
        fuse = new Fuse(data, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'description', weight: 1.5 },
            { name: 'ingredients', weight: 1 },
            { name: 'tags', weight: 1 }
          ],
          threshold: 0.3
        });
      });
  }

  function openSearch() {
    overlay.classList.add('active');
    input.focus();
  }

  function closeSearch() {
    overlay.classList.remove('active');
    input.value = '';
    results.innerHTML = '';
  }

  toggle.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  input.addEventListener('input', function() {
    const query = this.value.trim();
    if (!query || !fuse) {
      results.innerHTML = '<p class="search-hint">Zoek op recept, ingrediënt of tag</p>';
      return;
    }
    const matches = fuse.search(query).slice(0, 8);
    if (matches.length === 0) {
      results.innerHTML = '<p class="search-empty">Geen recepten gevonden</p>';
    } else {
      results.innerHTML = matches.map(r =>
        `<a href="${r.item.url}" class="search-result">
          <span class="search-result-title">${r.item.title}</span>
          ${r.item.description ? `<span class="search-result-desc">${r.item.description}</span>` : ''}
        </a>`
      ).join('');
    }
  });
})();
