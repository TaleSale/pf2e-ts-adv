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
    newHtml = newHtml.replace(/(Крит.Провал|Критический Провал|Крит.провал|Критический провал)(:)/g, '<kritproval>$1</kritproval>$2');
    newHtml = newHtml.replace(/(Крит.Успех|Критический Успех|Крит.успех|Критический успех)(:)/g, '<krituspeh>$1</krituspeh>$2');
    newHtml = newHtml.replace(/(Успех)(:)/g, '<uspeh>$1</uspeh>$2');
    newHtml = newHtml.replace(/(Провал)(:)/g, '<proval>$1</proval>$2');
    newHtml = newHtml.replace(/(Триггер)(:)/g, '<red>$1</red>$2');
    newHtml = newHtml.replace(/(Требован[а-яё]*)(:)/g, '<darkblue>$1</darkblue>$2');
    newHtml = newHtml.replace(/(Частота)(:)/g, '<green>$1</green>$2');
    newHtml = newHtml.replace(/(Эффект)(:)/g, '<yellow>$1</yellow>$2');
    newHtml = newHtml.replace(/(Усиление)(\s\([1-90+а-яё]*\))(:)/g, '<purple>$1$2</purple>$3');




    return newHtml;
  });

  // Добавление стиля "ts-effect" только к <i> элементу внутри ссылки
  messageContent.find("a i.fa-solid.fa-person-rays").addClass("ts-effect");
  messageContent.find("a i.fas.fa-code").addClass("ts-macros");
});
