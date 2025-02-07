Hooks.on("renderItemSheet", (app, html, data) => {
  // Ищем кнопку по классу document-id-link внутри окна
  html.find("a.document-id-link").each((i, link) => {
    // Вешаем обработчик клика в режиме capture, чтобы он сработал раньше стандартного
    link.addEventListener("click", (e) => {
      // Если Shift не зажат — ничего не делаем, оставляем стандартное поведение
      if (!e.shiftKey) return;
      
      // Останавливаем выполнение остальных обработчиков
      e.stopImmediatePropagation();
      e.preventDefault();
      
      // Получаем полный UUID из объекта листа. Обычно он доступен как app.object.uuid.
      const fullUUID = app.object && app.object.uuid;
      if (fullUUID && typeof fullUUID === "string") {
        // Разбиваем строку по точкам и берём последний сегмент
        const idOnly = fullUUID.split(".").pop();
        navigator.clipboard.writeText(idOnly).then(() => {
          ui.notifications.info(`Скопирован ID: ${idOnly}`);
        });
      } else {
        ui.notifications.warn("Не удалось определить UUID для копирования.");
      }
    }, true);
  });
});
