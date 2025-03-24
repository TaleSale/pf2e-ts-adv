// Импорт необходимых модулей
const { Actor } = game;

// Функция для обработки описания предмета
function replaceNameInDescription(actor, item) {
    if (!actor || !item) return;

    const description = item.system.description;
    const actorName = actor.name;

    if (description.includes('@name')) {
        const newDescription = description.replace(/@name/g, actorName);
        item.update({ 'system.description': newDescription });
    }
}

// Обработчик для изменения описания предмета
function onItemUpdate(item, diff) {
    if (diff['system.description']) {
        const actor = item.parent;
        replaceNameInDescription(actor, item);
    }
}

// Подключение обработчика к событию обновления предмета
Hooks.on('updateItem', onItemUpdate);

// Обработка существующих предметов при загрузке игры
async function processExistingItems() {
    const actors = game.actors.contents;
    for (const actor of actors) {
        const items = actor.items.contents;
        for (const item of items) {
            replaceNameInDescription(actor, item);
        }
    }
}

// Вызов функции обработки существующих предметов
processExistingItems();