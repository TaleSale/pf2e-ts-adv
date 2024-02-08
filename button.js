Hooks.on("renderChatMessage", (message, html) => {
  const messageContent = html.find(".message-content");
  messageContent.html((index, oldHtml) => {
    let newHtml = oldHtml
      //Кнопки в описание
        .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sпрост[а-яё]*\sспасброс[а-яё]*\sрефлекс[а-яё]*<\/span>/gi, 
      '<span class="label">Пр.Спас.РФЛ <span data-visibility="gm">КС_$1</span> </span>')
      .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sпрост[а-яё]*\sспасброс[а-яё]*\sстойкост[а-яё]*<\/span>/gi, 
      '<span class="label">Пр.Спас.СТК <span data-visibility="gm">КС_$1</span> </span>')
      .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sпрост[а-яё]*\sспасброс[а-яё]*\sвол[а-яё]*<\/span>/gi, 
      '<span class="label">Пр.Спас.Воля <span data-visibility="gm">КС_$1</span> </span>')
      .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sрефлекс[а-яё]*<\/span>/gi, 
      '<span class="label">РФЛ <span data-visibility="gm">КС_$1</span> </span>')
      .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sстойкост[а-яё]*<\/span>/gi, 
      '<span class="label">СТК <span data-visibility="gm">КС_$1</span> </span>')
      .replace(/<span class="label"><span data-visibility="gm">DC (\d+)<\/span>\sвол[а-яё]*<\/span>/gi, 
      '<span class="label">Воля <span data-visibility="gm">КС_$1</span> </span>')
      //Кнопки снизу заклинания
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Стойкост[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Спас.СТК <span data-visibility="gm">КС_$2</span></button>')
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Рефлекс[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Спас.РФЛ <span data-visibility="gm">КС_$2</span></button>')
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Вол[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Спас.ВОЛЯ <span data-visibility="gm">КС_$2</span></button>')
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС просто[а-яё]* спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Стойкост[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Пр.Спас.СТК <span data-visibility="gm">КС_$2</span></button>')
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС просто[а-яё]* спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Рефлекс[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Пр.Спас.РФЛ <span data-visibility="gm">КС_$2</span></button>')
      .replace(/<button type="button" data-action="spell-save"([^>]*)>\s*КС просто[а-яё]* спасброск[а-яё]* <span data-visibility="gm">(\d+)<\/span> Вол[а-яё]*\s*<\/button>/gi, 
      '<button type="button" data-action="spell-save"$1>Пр.Спас.ВОЛЯ <span data-visibility="gm">КС_$2</span></button>')
      // Другие кнопки
      .replace(/(<a class="inline-roll roll"[^>]*>.*?)(продолжительный урон)(.*?<\/a>)/gi, 
      '$1продолж.урон$3')
      .replace(/(<span data-pf2-effect-area="emanation" data-pf2-distance="(\d+)"[^>]*>)(.*?)(<\/span>)/gi, 
      '$1Эманация_$2$4')
      .replace(/(<span data-pf2-effect-area="line" data-pf2-distance="(\d+)"[^>]*>)(.*?)(<\/span>)/gi, 
      '$1Линия_$2$4')
      .replace(/(<span data-pf2-effect-area="burst" data-pf2-distance="(\d+)"[^>]*>)(.*?)(<\/span>)/gi, 
      '$1Взрыв_$2$4')
      .replace(/(<span data-pf2-effect-area="cone" data-pf2-distance="(\d+)"[^>]*>)(.*?)(<\/span>)/gi, 
      '$1Конус_$2$4')
      //Вне кнопок
      .replace(/прост[а-яё]*\sспасброс[а-яё]*\sрефлекс[а-яё]*/gi, '<u>Пр.Спас.РФЛ</u>')
      .replace(/прост[а-яё]*\sспасброс[а-яё]*\sвол[а-яё]*/gi, '<u>Пр.Спас.ВОЛЯ</u>')
      .replace(/прост[а-яё]*\sспасброс[а-яё]*\sстойкост[а-яё]*/gi, '<u>Пр.Спас.СТК</u>')
      // Используем отрицательный предпросмотр для следующих замен
      .replace(/(?<!прост[а-яё]*\s)спасброс[а-яё]*\sрефлекс[а-яё]*/gi, '<u>Спас.РФЛ</u>')
      .replace(/(?<!прост[а-яё]*\s)спасброс[а-яё]*\sвол[а-яё]*/gi, '<u>Спас.ВОЛЯ</u>')
      .replace(/(?<!прост[а-яё]*\s)спасброс[а-яё]*\sстойкост[а-яё]*/gi, '<u>Спас.СТК</u>')
    return newHtml;
  });
});
