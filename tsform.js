$(document).ready(function () {
  // Функция для применения стилей к тексту
  function applyTextStyling(element) {
    const replacePatterns = formattingArray;

    // Обработка каждого текстового узла внутри элемента
    element.find("*").addBack().contents().each(function () {
      if (this.nodeType === Node.TEXT_NODE) {
        let text = $(this).text();
        let modifiedText = text;

        // Замена текстовых паттернов на соответствующие стили
        replacePatterns.forEach(({ pattern, style }) => {
          const regex = new RegExp(pattern, "gmi");

          modifiedText = modifiedText.replace(regex, (match) => {
            let replacedMatch = match;

            // Если стиль требует обрамления в спан и текст содержит обрамляющие символы
            if ((style === "ts-priznak" || style === "ts-mirovoz" || style === "ts-razmer" || style === "ts-obich" || style === "ts-neobich" || style === "ts-redk" || style === "ts-unik" || style === "ts-obuchen" || style === "ts-ekspert" || style === "ts-master" || style === "ts-legenda") && (replacedMatch.startsWith("`") || replacedMatch.startsWith("'") || replacedMatch.endsWith("\"")) && (replacedMatch.endsWith("`") || replacedMatch.endsWith("'") || replacedMatch.endsWith("\""))) {
              const word = replacedMatch.slice(1, -1);
              replacedMatch = `<span class="${style}">${word}</span>`;
            } else {
              replacedMatch = `<span class="${style}">${replacedMatch}</span>`;
            }

            return replacedMatch;
          });
        });

        // Заменить текстовый узел, если были изменения
        if (modifiedText !== text) {
          $(this).replaceWith(modifiedText);
        }
      }
    });
  }

  applyTextStyling($(".journal-entry-page .journal-page-content"));

  $(document).on('DOMNodeInserted', '.journal-entry-page:not(.ts-styled)', function () {
    const $this = $(this);
    applyTextStyling($this.find(".journal-page-content"));
    $this.addClass("ts-styled");
  });
});