document.addEventListener("DOMContentLoaded", () => {
  const preCode = document.querySelector('.БлокСтат pre code');

  if (preCode) {
      const observer = new MutationObserver(() => {
          const text = preCode.textContent.trim();
          const words = text.split(/\s+/);

          const patterns = [
      { regex: /^обычн[а-я]*$/i, className: 'trts-common' },
      { regex: /^необычн[а-я]*$/i, className: 'trts-uncommon' },
      { regex: /^редк[а-я]*$/i, className: 'trts-rare' },
      { regex: /^уникальн[а-я]*$/i, className: 'trts-unik' },
      { regex: /^крошечн[а-я]*$/i, className: 'trts-razmer' },
      { regex: /^маленьк[а-я]*$/i, className: 'trts-razmer' },
      { regex: /^средн[а-я]*$/i, className: 'trts-razmer' },
      { regex: /^больш[а-я]*$/i, className: 'trts-razmer' },
      { regex: /^огромн[а-я]*$/i, className: 'trts-razmer' },
      { regex: /^исполинск[а-я]*$/i, className: 'trts-razmer' }
    ];

    const processedText = words.map(word => {
        for (let pattern of patterns) {
            if (pattern.regex.test(word)) {
                return `<span class="${pattern.className}">${word}</span>`;
            }
        }
        return `<span class="trts">${word}</span>`;
    }).join(' ');

    preCode.innerHTML = processedText;
});

observer.observe(preCode, { characterData: true, subtree: true });
}
});
