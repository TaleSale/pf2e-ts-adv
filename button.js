///Hooks.on('renderSidebarTab', async (app, html) => {
  if (app.options.id === "settings") {
    // Создаем кнопку с иконкой и текстом
    const button = $('<li class="aig-button"><i class="fas fa-robot"></i> AIG</li>');

    // Добавляем событие нажатия на кнопку
    button.click(function() {
      console.log("AIG button clicked!");
      // Здесь можно добавить дополнительную логику, например, открыть ваше собственное окно или панель.
    });
    
    // Ищем контейнер для кнопок и добавляем нашу кнопку в конец списка
    const controls = html.find(".sidebar-tab");
    if(controls.length > 0) {
      controls.append(button);
    }
  }
});
