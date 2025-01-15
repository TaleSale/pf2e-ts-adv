Hooks.on('preUpdateToken', async (scene, tokenDocument, updateData, options) => {
  // Проверяем, изменилось ли положение токена
  if (!('x' in updateData || 'y' in updateData)) {
    return;
  }

  const tokenId = tokenDocument.id;
  const currentToken = canvas.tokens.get(tokenId);
  if (!currentToken) return;

  // Получаем предыдущие координаты токена
  const previousX = tokenDocument.x;
  const previousY = tokenDocument.y;

  // Получаем новые координаты токена
  const newX = updateData.x !== undefined ? updateData.x : previousX;
  const newY = updateData.y !== undefined ? updateData.y : previousY;

  // Функция для проверки, находится ли точка внутри квадрата ауры
  function isPointInAura(pointX, pointY, auraToken, auraRange) {
    const auraTokenCenter = auraToken.getCenter(0, 0);
    const dx = Math.abs(pointX - auraTokenCenter.x);
    const dy = Math.abs(pointY - auraTokenCenter.y);
    const gridSize = canvas.grid.size;
    return dx <= (auraRange * gridSize) / 2 && dy <= (auraRange * gridSize) / 2;
  }

  // Функция для проверки, пересекает ли токен квадрат ауры
  function didTokenCrossAura(prevX, prevY, newX, newY, auraToken, auraRange) {
    const gridSize = canvas.grid.size;
    const prevCenter = { x: prevX + currentToken.width * gridSize / 2, y: prevY + currentToken.height * gridSize / 2 };
    const newCenter = { x: newX + currentToken.width * gridSize / 2, y: newY + currentToken.height * gridSize / 2 };

    // Проверяем, был ли предыдущий центр вне ауры, а новый внутри
    const wasOutside = !isPointInAura(prevCenter.x, prevCenter.y, auraToken, auraRange);
    const isInside = isPointInAura(newCenter.x, newCenter.y, auraToken, auraRange);

    return wasOutside && isInside;
  }

  // Ищем все эффекты на сцене
  const allEffects = scene.tokens.reduce((acc, t) => {
    t.actor?.effects.forEach(effect => acc.push({ effect, token: t }));
    return acc;
  }, []);

  // Фильтруем эффекты, названия которых начинаются с "Hazardous Terrain"
  const hazardousTerrainEffects = allEffects.filter(item => item.effect.name?.startsWith("Hazardous Terrain"));

  for (const hazardousTerrainEffectData of hazardousTerrainEffects) {
    const effect = hazardousTerrainEffectData.effect;
    const effectToken = hazardousTerrainEffectData.token;

    // Проверяем, есть ли у эффекта аура
    const auraRange = effect.flags?.tokenauras?.aura?.radius;
    console.log(`Аура эффекта "${effect.name}" на токене "${effectToken.name}":`, auraRange); // Добавлена отладка

    if (auraRange) {
      if (didTokenCrossAura(previousX, previousY, newX, newY, effectToken, auraRange)) {
        // Извлекаем формулу урона и тип урона из названия эффекта
        const match = effect.name.match(/^Hazardous Terrain\s+(.+)\s+(.+)$/);
        if (match) {
          const damageFormula = match[1];
          const damageType = match[2];

          // Отправляем сообщение в чат с броском урона
          ChatMessage.create({
            content: `/r ${damageFormula}[${damageType}]`,
            speaker: { alias: effectToken.name },
          });

          // Опционально: Добавьте повествовательное сообщение
          ChatMessage.create({
            content: `${currentToken.name} проходит через опасную область от ${effectToken.name}.`,
            speaker: { alias: "Система" },
          });
        }
      }
    }
  }
});