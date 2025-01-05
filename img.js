const currentIndexes = {};

/**
 * Добавление кнопок под изображением листа актора для переключения изображений.
 */
Hooks.on("renderActorSheet", (app, html, data) => {
    const document = app.actor;
    const images = [document.img, document.img2, document.img3].filter(Boolean);
    if (images.length < 2) return; // Если недостаточно изображений, кнопки не добавляются

    // Инициализация текущего индекса, если ещё не существует
    const actorId = document.id;
    if (currentIndexes[actorId] === undefined) currentIndexes[actorId] = 0;

    // Универсальный поиск изображения
    const imgElement = html.find("img.profile, img[data-edit='img']"); // Попытка найти подходящее изображение
    if (!imgElement.length) return;

    // Устанавливаем начальное изображение
    imgElement.attr("src", images[currentIndexes[actorId]]);

    // Создаем контейнер для кнопок
    const buttonContainer = $(
      `<div style="text-align: center; margin-top: 5px;">
        <button id="prevImage" style="margin-right: 5px;">&#x3C;</button>
        <button id="nextImage">&#x3E;</button>
      </div>`
    );

    // Добавляем контейнер кнопок под изображение
    imgElement.after(buttonContainer);

    // Обработчик кликов для кнопок
    buttonContainer.find("#prevImage").click(() => changeImage(-1, images, actorId, imgElement));
    buttonContainer.find("#nextImage").click(() => changeImage(1, images, actorId, imgElement));
});

/**
 * Функция смены изображения.
 * @param {number} direction - Направление смены (-1 для предыдущего, 1 для следующего).
 * @param {string[]} images - Список изображений листа.
 * @param {string} actorId - ID текущего актора.
 * @param {jQuery} imgElement - Элемент изображения для обновления.
 */
function changeImage(direction, images, actorId, imgElement) {
    currentIndexes[actorId] = (currentIndexes[actorId] + direction + images.length) % images.length;
    const newImage = images[currentIndexes[actorId]];
    imgElement.attr("src", newImage);
}
