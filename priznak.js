Hooks.on("renderChatMessage", (message, html) => {
  const messageContent = html.find(".message-content");
  messageContent.html((index, oldHtml) => {
    // Используем регулярное выражение для поиска и замены текста внутри символов ``
    let newHtml = oldHtml.replace(/`([^`"<>]+)`/g, '<u>`$1`</u>');

    // Замена шаблонов на обернутые в теги версии
    newHtml = newHtml.replace(/(штраф[а-яё]*\s)(обстоятельств[а-яё]*)/g, '$1<tso>$2</tso>');
    newHtml = newHtml.replace(/(бонус[а-яё]*\s)(обстоятельств[а-яё]*)/g, '$1<tso>$2</tso>');
    newHtml = newHtml.replace(/(штраф[а-яё]*\s)(состоян[а-яё]*)/g, '$1<tss>$2</tss>');
    newHtml = newHtml.replace(/(бонус[а-яё]*\s)(состоян[а-яё]*)/g, '$1<tss>$2</tss>');
    newHtml = newHtml.replace(/(штраф[а-яё]*\s)(предмета)/g, '$1<tsp>$2</tsp>');
    newHtml = newHtml.replace(/(бонус[а-яё]*\s)(предмета)/g, '$1<tsp>$2</tsp>');

    return newHtml;
  });

  // Добавление стиля "ts-effect" только к <i> элементу внутри ссылки
  messageContent.find("a i.fa-solid.fa-person-rays").addClass("ts-effect");
  messageContent.find("a i.fas.fa-code").addClass("ts-macros");
});
