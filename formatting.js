function applyTextStyling(element) {
    const replacePatterns = formattingArray;
  
    element.find("*").addBack().contents().each(function () {
      if (this.nodeType === Node.TEXT_NODE) {
        let text = $(this).text();
        let modifiedText = text;
  
        replacePatterns.forEach(({ pattern, style }) => {
          const regex = new RegExp(pattern, "gmi");
  
          modifiedText = modifiedText.replace(regex, (match) => {
            let replacedMatch = match;
  
            if ((style === "ts-ataka" || style === "ts-spisok" || style === "ts-eshed" || style === "ts-priznak" || style === "ts-razmer" || style === "ts-obich" || style === "ts-neobich" || style === "ts-redk" || style === "ts-unik" || style === "ts-od" || style === "ts-slot" || style === "ts-netren" || style === "ts-obuchen" || style === "ts-ekspert" || style === "ts-master" || style === "ts-legenda" || style === "ts-mest") && (replacedMatch.startsWith("|") || replacedMatch.startsWith("=") || replacedMatch.startsWith("*") || replacedMatch.startsWith("`") || replacedMatch.startsWith("'") || replacedMatch.endsWith("\"")) && replacedMatch.endsWith("*") || (replacedMatch.endsWith("`") || replacedMatch.endsWith("'") || replacedMatch.endsWith("\"") || replacedMatch.endsWith("=")|| replacedMatch.endsWith("|"))) {
              const word = replacedMatch.slice(1, -1);
              return `<span class="${style}">${word}</span>`;
            }
  
            return `<span class="${style}">${replacedMatch}</span>`;
          });
        });
  
        if (modifiedText !== text) {
          $(this).replaceWith(modifiedText);
        }
      }
    });
  
    // Преобразование span с классом ts-narrativ в абзац
    element.find("p span.ts-narrativ").each(function () {
      const span = $(this);
      const paragraph = $("<p>").addClass("ts-narrativ").html(span.html());
      span.replaceWith(paragraph);
    });
  
    // Применение стиля ts-utochnit к абзацам
    element.find("blockquote").addClass("ts-utochnit");
    // Применение стиля ts-razv к абзацам с text-align: left;
    element.find("p").filter(function() {
      return $(this).css("text-align") === "left";
    }).addClass("ts-razv");
    
      // Обработка класса "content-link"
      element.find(".content-link").each(function () {
        const link = $(this);
        link.find("[class^='ts-']").each(function () {
          const classes = $(this).attr("class").split(" ");
          const modifiedClasses = classes.map((cls) => (cls.startsWith("ts-") ? cls.slice(3) : cls));
          $(this).attr("class", modifiedClasses.join(" "));
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
    
  
      // Обработка класса "tag"
      element.find(".tag").each(function () {
        const tag = $(this);
        tag.find("[class^='ts-']").each(function () {
          const classes = $(this).attr("class").split(" ");
          const modifiedClasses = classes.map((cls) => (cls.startsWith("ts-") ? cls.slice(3) : cls));
          $(this).attr("class", modifiedClasses.join(" "));
      });
    });
  
        // Добавление стиля "ts-effect" только к <i> элементу внутри ссылки
        link.find("i.fa-solid.fa-person-rays").addClass("ts-effect");
        link.find("i.fas.fa-code").addClass("ts-macros");
      });

  
    if (element.hasClass("message-content")) {
      element.find(".ts-narrativ").css("display", "none");
    }
  }
  
  $(document).ready(function () {
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
  
          // Обработка класса "with-repost" внутри журнала
          pageContent.find(".with-repost").each(function () {
            const repost = $(this);
            repost.find("[class^='ts-']").each(function () {
              const classes = $(this).attr("class").split(" ");
              const modifiedClasses = classes.map((cls) => (cls.startsWith("ts-") ? cls.slice(3) : cls));
              $(this).attr("class", modifiedClasses.join(" "));
            });
          });
        }
      });
    });
  
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  });
  