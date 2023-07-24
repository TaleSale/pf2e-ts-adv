function replacePhrasesInElement(element) {
  const disableScripts = game.settings.get("pf2e-ts-adv", "disableScripts");
  if (!disableScripts) {


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

    function processElement(element) {
      if (element.nodeType === Node.TEXT_NODE) {
        const originalText = element.nodeValue;
        const replacedText = replacePhrasesInText(originalText);

        if (originalText !== replacedText) {
          element.nodeValue = replacedText;
        }
      } else if (!isButtonElement(element)) {
        element.childNodes.forEach(processElement);
      }

      if ($(element).hasClass("message-content") || $(element).hasClass("item-description")) {
        applyTextStyling($(element));
      }
    }

    function isButtonElement(element) {
      return $(element).is(".fas");
    }

    Hooks.on("renderChatMessage", (message, html) => {
      const messageContent = html.find(".message-content");
      processElement(messageContent[0]);
    });

    Hooks.on("renderItemSheet", (app, html) => {
      const itemDescription = html.find(".item-description");
      itemDescription.find("p").each(function () {
        processElement(this);
      });
      applyTextStyling(itemDescription);
    });
  }
}
