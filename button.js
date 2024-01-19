///Hooks.on('renderItemSheet', (app, html, data) => {
  // Проверяем, есть ли уже переключатель, чтобы не добавлять его повторно
  if (html.find('.toggle-switch-container').length === 0) {
    // Создаем элемент переключателя
    const switchHtml = `
      <div class="toggle-switch-container">
        <div class="toggle-switch">
          <span class="toggle-slider round"></span>
        </div>
      </div>
    `;

    // Вставляем переключатель в нижний левый угол карточки предмета
    const content = html.find('.sheet-body'); // Используйте класс, который обозначает основной контейнер карточки предмета
    content.append(switchHtml);

    // Добавляем обработчик события на клик по переключателю
    html.find('.toggle-switch').on('click', function() {
      $(this).toggleClass('active');
      // Вызываем функцию для смены описания
      if ($(this).hasClass('active')) {
        // Отображаем оригинальное описание
      } else {
        // Отображаем переведенное описание
      }
    });
  }
});
