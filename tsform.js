$(document).ready(function () {
  function applyTextStyling(element) {
    const replacePatterns = formattingArray;

    element.find("*:not(.styled)").addBack().contents().each(function () {
      if (this.nodeType === Node.TEXT_NODE && !$(this).parent().hasClass("styled")) {
        let text = $(this).text();
        let modifiedText = text;

        replacePatterns.forEach(({ pattern, style }) => {
          modifiedText = modifiedText.replace(pattern, (match, ...groups) => {
            // Определяем, требуется ли убрать обрамляющие символы и применить стиль
            const word = match.startsWith("`") && match.endsWith("`") ? match.slice(1, -1) : match;
            return `<span class="${style}">${word}</span>`;
          });
        });

        if (modifiedText !== text) {
          $(this).replaceWith(modifiedText);
        }
      }
    });

    element.find("*").addBack().addClass("styled");
  }

  applyTextStyling($(".journal-entry-page .journal-page-content"));

  $(document).on('DOMNodeInserted', function (event) {
    const $target = $(event.target);
    if ($target.hasClass("journal-entry-page")) {
      applyTextStyling($target.find(".journal-page-content"));
    }
  });
});
