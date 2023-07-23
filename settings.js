Hooks.once('init', () => {
  game.settings.register("pf2e-ts-adv", "disableScripts", {
    name: "Отключить TS-Оформление и TS-Замены",
    hint: "Отключает скрипты авто-оформления и авто-замены в модуле",
    scope: "client", // Область видимости для всех игроков
    config: true,
    default: false,
    type: Boolean,
    onChange: () => window.location.reload(),
  });
});

Hooks.on("renderChatMessage", (message, html) => {
  const disableScripts = game.settings.get("pf2e-ts-adv", "disableScripts");
  if (!disableScripts) {
    const messageContent = html.find(".message-content");
    replacePhrasesInElement(messageContent[0]);
  }
});

Hooks.on("renderItemSheet", (app, html) => {
  const disableScripts = game.settings.get("pf2e-ts-adv", "disableScripts");
  if (!disableScripts) {
    const itemDescription = html.find(".item-description");

    // Выполнение замены словосочетаний и применения оформления в каждом абзаце
    itemDescription.find("p").each(function () {
      replacePhrasesInElement(this);
    });

    // Применение оформления для описания предмета
    applyTextStyling(itemDescription);
  }
});
