// Слушаем клики на весь документ
$(document).on('click', '.read', function(event) {
    // Получаем размеры элемента
    const elementWidth = this.clientWidth;
    const elementHeight = this.clientHeight;
    
    // Определяем координаты клика
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    
    // Zадаем границы для активной области клика
    const activeClickWidth = elementWidth - 10; // клик в последние 100px ширины
    const activeClickHeight = 10;               // клик в первые 100px высоты
    
    // Проверяем, что клик был в установленной области
    if (clickX > activeClickWidth && clickY < activeClickHeight) {
      let sectionContent = this.innerHTML;
      
      // Создание объекта данных для сообщения в чат
      let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: sectionContent
      };
      
      // Отправка сообщения в чат
      ChatMessage.create(chatData);
    }
  });

Hooks.on('init', () => {
    Babele.get().register({
        module: 'pf2e-ts-adv',
        lang: 'ru',
        dir: 'compendium'
    });
});
