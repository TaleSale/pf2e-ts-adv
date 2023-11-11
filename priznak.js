Hooks.on("renderChatMessage", (message, html) => {
  const messageContent = html.find(".message-content");
  messageContent.html((index, oldHtml) => {
    // Используем регулярное выражение для поиска и замены текста внутри символов ``
    return oldHtml.replace(/`([^`"<>]+)`/g, '<u>`$1`</u>');    
  });

  // Добавление стиля "ts-effect" только к <i> элементу внутри ссылки
  messageContent.find("a i.fa-solid.fa-person-rays").addClass("ts-effect");
  messageContent.find("a i.fas.fa-code").addClass("ts-macros");
});
