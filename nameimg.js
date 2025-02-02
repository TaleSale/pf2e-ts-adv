!!!// Функция для добавления вкладки "Оригинал" на листах предметов/NPC
1111function addOriginalTab(app, html) {
    try {
      // 1. Находим навигацию вкладок
      const nav = html.find('nav.sheet-tabs');
      if (!nav.length) return;
      
      // 2. Находим контейнер кнопок вкладок (обычно data-tab-container="primary")
      const tabsContainer = nav.find('.tabs[data-tab-container="primary"]');
      if (!tabsContainer.length) return;
      
      // 3. Создаём кнопку-вкладку "Оригинал" и вставляем её после кнопки "Описание"
      const originalTabButton = $(`<a class="list-row" data-tab="original">Оригинал</a>`);
      const descriptionTabButton = tabsContainer.find('[data-tab="description"]');
      if (descriptionTabButton.length) {
        descriptionTabButton.after(originalTabButton);
      } else {
        tabsContainer.append(originalTabButton);
      }
      
      // 4. Находим контейнер для содержимого вкладок (обычно .sheet-body)
      const sheetBody = html.find('.sheet-body');
      if (!sheetBody.length) return;
      
      // 5. Находим секцию описания (вкладка "Описание")
      const descriptionSection = sheetBody.find('section.tab[data-tab="description"]');
      if (!descriptionSection.length) return;
      
      // 6. Создаём новую секцию для вкладки "Оригинал"
      // При этом создадим чистый контейнер с аналогичной структурой редактора.
      const originalSection = $(`<section class="tab" data-tab="original"></section>`);
      
      // 7. Из секции описания выбираем нужный блок редактора.
      // В приведённом примере оригинальное содержание находится в блоке с классом "main editor-container".
      const mainEditorContainer = descriptionSection.find('section.main.editor-container');
      if (!mainEditorContainer.length) {
        console.error("Не найден блок основного редактора описания.");
        return;
      }
      
      // 8. Клонируем найденый блок редактора
      const originalEditorContainer = mainEditorContainer.clone();
      
      // 9. Записываем в клонированном блоке оригинальное содержимое из данных документа
      // Именно то, что было до вмешательства Babele.
      const originalText = app.object.data.data.description.value || "<p>Нет описания</p>";
      originalEditorContainer.find('.editor-content[data-edit="system.description.value"]').html(originalText);
      
      // 10. Вставляем скопированный блок в секцию вкладки "Оригинал"
      originalSection.append(originalEditorContainer);
      
      // 11. Добавляем секцию "Оригинал" сразу после секции "Описание"
      descriptionSection.after(originalSection);
    } catch (err) {
      console.error("Ошибка при добавлении вкладки 'Оригинал':", err);
    }
  }
  
  // Регистрируем хук для листа предметов
  Hooks.on("renderItemSheet", (app, html, data) => {
    addOriginalTab(app, html);
  });
  
  // Регистрируем хук для NPC PF2e (если используется соответствующий шаблон)
  Hooks.on("renderNPCSheetPF2e", (app, html, data) => {
    addOriginalTab(app, html);
  });
  