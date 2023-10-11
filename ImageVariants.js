Hooks.on("renderActorSheet", (app, html, data) => {
  // Проверяем, что это лист NPC (может потребоваться настроить это условие в зависимости от вашего системы)
  if (data.actor.type === "npc") {
    // Получаем уникальный идентификатор листа NPC
    const actorId = data.actor._id;

    // Создаем HTML-элементы для чекбоксов
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    // Добавляем текст "Варианты:"
    const variantsLabel = document.createElement("span");
    variantsLabel.textContent = "Варианты:";
    checkboxContainer.appendChild(variantsLabel);

    // Устанавливаем единое имя "imageVariants" для всех чекбоксов
    const checkboxNames = ["A1", "A2", "A3"];
    for (const name of checkboxNames) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "imageVariants"; // Единое имя для всех чекбоксов
      checkbox.id = `checkbox_${name}_${actorId}`; // Уникальный идентификатор
      checkboxContainer.appendChild(checkbox);
    }

    // Вставляем чекбоксы перед секцией armor-section
    const armorSection = html.find(".side-bar-section.armor-section");
    armorSection.before(checkboxContainer);

    // Добавляем CSS для выравнивания чекбоксов в одну строку
    checkboxContainer.style.display = "flex";
    checkboxContainer.style.alignItems = "center"; // Центрирование текста и чекбоксов по вертикали

    // Логика для активации только одного чекбокса и сохранение состояния
    const checkboxes = html.find('input[name="imageVariants"]');
    checkboxes.on("change", (event) => {
      checkboxes.prop("checked", false);
      $(event.currentTarget).prop("checked", true);

      // Сохраняем состояние чекбокса в Local Storage
      const selectedCheckbox = $(event.currentTarget).attr("id");
      localStorage.setItem(`selectedCheckbox_${actorId}`, selectedCheckbox);

      // Получаем адрес изображения портрета
      const textureElement = html.find(".actor-image");
      const srcAttribute = textureElement.attr("src");

      // Получаем адрес изображения токена
      const tokenElement = html.find(".token .token-image");
      const tokenSrcAttribute = tokenElement.attr("src");

      // Изменяем адрес изображения портрета и токена в зависимости от выбранного чекбокса
      if (selectedCheckbox === `checkbox_A2_${actorId}`) {
        textureElement.attr("src", updateImageSrc(srcAttribute, "_2_"));
        tokenElement.attr("src", updateImageSrc(tokenSrcAttribute, "_2_"));

        // Обновляем изображение токена на холсте
        const token = canvas.tokens.get(actorId);
        if (token) {
          const newImageSrc = updateImageSrc(token.data.img, "_2_");
          token.update({ img: newImageSrc });
        }
      } else if (selectedCheckbox === `checkbox_A3_${actorId}`) {
        textureElement.attr("src", updateImageSrc(srcAttribute, "_3_"));
        tokenElement.attr("src", updateImageSrc(tokenSrcAttribute, "_3_"));

        // Обновляем изображение токена на холсте
        const token = canvas.tokens.get(actorId);
        if (token) {
          const newImageSrc = updateImageSrc(token.data.img, "_3_");
          token.update({ img: newImageSrc });
        }
      } else if (selectedCheckbox === `checkbox_A1_${actorId}`) {
        textureElement.attr("src", updateImageSrc(srcAttribute, ""));
        tokenElement.attr("src", updateImageSrc(tokenSrcAttribute, ""));

        // Обновляем изображение токена на холсте
        const token = canvas.tokens.get(actorId);
        if (token) {
          const newImageSrc = updateImageSrc(token.data.img, "");
          token.update({ img: newImageSrc });
        }
      }
    });

    // Восстановление состояния чекбокса при открытии листа
    const selectedCheckboxId = localStorage.getItem(`selectedCheckbox_${actorId}`);
    if (selectedCheckboxId) {
      const selectedCheckbox = html.find(`#${selectedCheckboxId}`);
      if (selectedCheckbox) {
        selectedCheckbox.prop("checked", true);
      }
    }

    // Активируем чекбокс "A1", если ни один из чекбоксов не активирован
    const noCheckboxSelected = checkboxes.filter(":checked").length === 0;
    if (noCheckboxSelected) {
      const checkboxA1 = html.find(`#checkbox_A1_${actorId}`);
      checkboxA1.prop("checked", true);
      localStorage.setItem(`selectedCheckbox_${actorId}`, `checkbox_A1_${actorId}`);
    }
  }
});

// Функция для обновления адреса изображения
function updateImageSrc(src, suffix) {
  // Удаляем суффиксы "_2_" или "_3_" перед .webp, если они есть
  const cleanedSrc = src.replace(/(_2_|_3_)\.webp$/, ".webp");
  // Добавляем указанный суффикс
  return cleanedSrc.replace(".webp", `${suffix}.webp`);
}
