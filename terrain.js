// Отслеживание движения токенов по опасной зоне ауры эффекта
Hooks.on('updateToken', async (scene, token, update) => {
  if (!update.x && !update.y) return;

  const tokenObject = canvas.tokens.get(token._id);
  if (!tokenObject) return;

  const hazardousEffect = tokenObject.actor?.effects.find(e => e.name.startsWith("Hazardous Terrain"));
  if (!hazardousEffect) return;

  const damageMatch = hazardousEffect.name.match(/(\d+d\d+)\s*(\w+)/);
  if (!damageMatch) return;

  const [_, formula, type] = damageMatch;
  const damageData = { formula, type };

  // Создание сообщения об уроне
  const messageContent = `/r ${damageData.formula}[${damageData.type}]`;
  const chatMessage = await ChatMessage.create({ content: messageContent, speaker: { alias: tokenObject.name } });

  // Ждём, пока сообщение появится в чате, и находим его DOM-элемент
  Hooks.once('renderChatMessage', (message, html) => {
      if (message.id !== chatMessage.id) return;

      const applyDamageButton = html[0].querySelector('button[data-action="apply-damage"]');
      if (applyDamageButton) {
          // Эмулируем нажатие на кнопку «Нанести урон»
          applyDamageButton.click();
      } else {
          console.error('Кнопка "Нанести урон" не найдена в сообщении.');
      }
  });
});
