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
            return `<span class="${style}">${word}</span>`;
          }

          return `<span class="${style}">${replacedMatch}</span>`;
        });
      });

      // Заменить текстовый узел, если были изменения
      if (modifiedText !== text) {
        $(this).replaceWith(modifiedText);
      }
    }
  });
  
  // Удаление префикса "ts-" из классов стилей внутри абзацев заголовков
  element.find("h1, h2, h3, h4, h5, h6").each(function () {
    const heading = $(this);
    heading.find("[class^='ts-']").each(function () {
      const classes = $(this).attr("class").split(" ");
      const modifiedClasses = classes.map((cls) => (cls.startsWith("ts-") ? cls.slice(3) : cls));
      $(this).attr("class", modifiedClasses.join(" "));
    });
  });

  // Добавление стиля "ts-effect" только к <i> элементу внутри ссылки
  element.find("a i.fa-solid.fa-person-rays").addClass("ts-effect");
  element.find("a i.fas.fa-code").addClass("ts-macros");

}

$(document).ready(function () {
  // Применить стили к контенту журнала при загрузке страницы
  const journalContent = $(".journal-entry-page .journal-page-content");
  applyTextStyling(journalContent);

  // Добавление хука для динамического содержания журнала
  const observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
      if (
        $(mutation.target).hasClass("journal-entry-page") &&
        !$(mutation.target).hasClass("ts-styled") // Проверка, чтобы избежать повторного применения стилей
      ) {
        const pageContent = $(mutation.target).find(".journal-page-content");
        applyTextStyling(pageContent);
        $(mutation.target).addClass("ts-styled"); // Добавление класса для пометки, что стили уже применены
      }
    });
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
});
