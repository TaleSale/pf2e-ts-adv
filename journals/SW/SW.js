// modules/pf2e-ts-adv/createJournal.js


class SWJournalSheet extends JournalSheet {
  getData(options) {
    const data = super.getData(options);
    return data;
  }

  get template() {
    return super.template;
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes.push("SW");
    return options;
  }

  async activateListeners(html) {
    super.activateListeners(html);

    const navigationElement = html.find('.journal-sidebar')[0];
    const contentElement = html.find('.journal-entry-content')[0];

    if (navigationElement) {
      navigationElement.style.background = "url('modules/pf2e-ts-adv/journals/SW/back.webp') no-repeat center center";
      navigationElement.style.backgroundSize = "cover";
      navigationElement.style.width = '300px';  // установим ширину навигационной части
      navigationElement.style.color = 'rgb(1, 65, 39)';
    }

    // Устанавливаем стили для разных уровней текста
    const level1Items = html.find('.directory-item.text.level1');
    level1Items.each((_, el) => {
      el.style.fontWeight = 'bold';
    });

    const level3Items = html.find('.directory-item.text.level3');
    level3Items.each((_, el) => {
      el.style.fontStyle = 'italic';
    });

    if (contentElement) {
      contentElement.style.backgroundColor = "#f0f0f0";  // светло-серый фон
    }

    // Удаляем элемент с классом `journal-header`, если он существует
    const journalHeaderElement = html.find('.journal-header')[0];
    if (journalHeaderElement) {
      journalHeaderElement.remove();
    }

    // Загружаем слова для выделения из JSON-файла
    try {
      const response = await fetch('modules/pf2e-ts-adv/journals/SW/keywords.json');
      const keywords = await response.json();
      this.setupMutationObserver(contentElement, keywords);
    } catch (error) {
      console.error('Error loading keywords:', error);
    }
  }

  // Метод для настройки MutationObserver
  setupMutationObserver(contentElement, keywords) {
    if (!contentElement) return;

    const observer = new MutationObserver((mutationsList) => {
      let shouldHighlight = false;
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          shouldHighlight = true;
          break;
        }
      }
      if (shouldHighlight) {
        this.highlightText(contentElement, keywords);
      }
    });

    observer.observe(contentElement, {
      childList: true,
      subtree: true
    });

    // Начальное выделение текста
    this.highlightText(contentElement, keywords);
  }

  // Метод для выделения текста
  highlightText(contentElement, keywords) {
    if (!contentElement) return;

    const regexes = Object.entries(keywords).reduce((acc, [color, words]) => {
      acc[color] = words.map(word => new RegExp(`(?<![а-яА-Я])${word}(?![а-яА-Я])`, 'gi'));
      return acc;
    }, {});

    const traverseAndHighlight = (node) => {
      if (node.nodeType === 3) {  // текстовый узел
        let text = node.nodeValue;
        for (const [color, regexArray] of Object.entries(regexes)) {
          for (const regex of regexArray) {
            text = text.replace(regex, `<span class="highlight-${color}">$&</span>`);
          }
        }
        if (text !== node.nodeValue) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = text;
          while (tempDiv.firstChild) {
            node.parentNode.insertBefore(tempDiv.firstChild, node);
          }
          node.parentNode.removeChild(node);
        }
      } else if (node.nodeType === 1 && node.nodeName !== "SPAN" && !node.classList.contains('editor-content') && !/H[1-6]/.test(node.nodeName)) {  // элемент и не редакторский контент и не заголовки
        node.childNodes.forEach(traverseAndHighlight);
      }
    };

    // Проверяем, есть ли редактор контента
    if (!contentElement.querySelector('.editor-content')) {
      traverseAndHighlight(contentElement);
    }
  }
}

Hooks.once('init', () => {
  DocumentSheetConfig.registerSheet(JournalEntry, 'SW', SWJournalSheet, {
    label: "Тема \"Война Спор\"",
    makeDefault: false
  });
});

// Добавляем стили для выделения текста
Hooks.once('ready', () => {
  const style = document.createElement('style');
  style.textContent = `
    .highlight-blue {
      font-family: Manuskript;
    }

    .highlight-red {
      font-weight: bold;
      font-family: Manuskript;
    }

    .highlight-green {
      text-decoration: underline;
    }
    
    .highlight-darkred {
      font-weight: bold;
      font-family: Manuskript;
      color: darkred;
    }

    .highlight-indigo {
      font-weight: bold;
      font-family: Manuskript;
      color: indigo;
    }
  `;
  document.head.appendChild(style);
});
