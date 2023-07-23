function replacePhrasesInElement(element) {
  const disableScripts = game.settings.get("pf2e-ts-adv", "disableScripts");
  if (!disableScripts) {


// Определение функции для замены словосочетаний в тексте
function replacePhrasesInText(text) {
  let replacedText = text;

  replacePhrasesArray.forEach(({ pattern, replacement }) => {
    const regex = new RegExp(pattern, "gi");
    replacedText = replacedText.replace(regex, (match, group1) => {
      if (group1 && replacement.includes("$1")) {
        return replacement.replace(/\$1/g, group1);
      } else {
        return replacement;
      }
    });
  });

  return replacedText;
}



// Определение функции для замены словосочетаний и применения оформления в элементе
function replacePhrasesInElement(element) {
  if (element.nodeType === Node.TEXT_NODE) {
    const originalText = element.nodeValue;
    const replacedText = replacePhrasesInText(originalText);

    if (originalText !== replacedText) {
      element.nodeValue = replacedText;
    }
  } else if (!isButtonElement(element)) {
    $(element).contents().each(function () {
      replacePhrasesInElement(this);
    });
  }

  if ($(element).hasClass("message-content") || $(element).hasClass("item-description")) {
    applyTextStyling($(element));
  }
}

// Определение функции для проверки, является ли элемент кнопкой
function isButtonElement(element) {
  return $(element).is(".fas");
}

// Добавление хука для чата
Hooks.on("renderChatMessage", (message, html) => {
  const messageContent = html.find(".message-content");

  // Выполнение замены словосочетаний и применения оформления в сообщении
  replacePhrasesInElement(messageContent[0]);
});

// Добавление хука для листа предметов
Hooks.on("renderItemSheet", (app, html) => {
  const itemDescription = html.find(".item-description");

  // Выполнение замены словосочетаний и применения оформления в каждом абзаце
  itemDescription.find("p").each(function () {
    replacePhrasesInElement(this);
  });

  // Применение оформления для описания предмета
  applyTextStyling(itemDescription);
});

}
}
