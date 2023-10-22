
Hooks.on("renderChatMessage", (message, html) => {
  const messageContent = html.find(".message-content");
  messageContent.html((index, oldHtml) => {
    // Используем регулярное выражение для поиска и замены текста внутри символов ``
    return oldHtml.replace(/`([^`]+)`/g, '<span class="highlighted-text">`$1`</span>');
  });
});