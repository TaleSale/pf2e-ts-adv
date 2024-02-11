///Hooks.on("preUpdateToken", async (document, change) => {
  const actor = document.actor;

  // Проверяем, есть ли признак "отряд" у существа
  if (actor && actor.system.traits.value.includes("troop")) {
    if ("x" in change || "y" in change) {
      const newX = change.x ?? document.x;
      const newY = change.y ?? document.y;
      const gridSize = canvas.grid.size;
      const movingTokenWidth = document.data.width * gridSize;
      const movingTokenHeight = document.data.height * gridSize;

      const intersects = (tokenA, tokenB) => {
        return tokenA.x < tokenB.x + tokenB.width * gridSize &&
               tokenA.x + tokenA.width * gridSize > tokenB.x &&
               tokenA.y < tokenB.y + tokenB.height * gridSize &&
               tokenA.y + tokenA.height * gridSize > tokenB.y;
      };

      const isOccupied = canvas.tokens.placeables.some(token => {
        if (token.id === document.id) return false;
        const tokenData = {
          x: token.x,
          y: token.y,
          width: token.data.width,
          height: token.data.height
        };
        const movingTokenData = {
          x: newX,
          y: newY,
          width: document.data.width,
          height: document.data.height
        };
        return intersects(movingTokenData, tokenData);
      });

      if (isOccupied) {
          ui.notifications.warn("Квадрат уже занят другим токеном.");
        return false; // Отменяем обновление токена
      }
    }
  }
});
