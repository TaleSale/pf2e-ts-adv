//Hooks.once('init', () => {
    // Перехватываем доступ к переводам
    const originalTranslations = game.i18n.translations;
    game.i18n.translations = new Proxy(originalTranslations, {
      get: function(target, prop, receiver) {
        // Проверяем, заменяем ли мы этот ключ
        if (prop === 'SaveDCLabel') {
          return "Спас. <dc>КС_{dc}</dc> {type}";
        } else if (prop === 'SaveDCLabelBasic') {
          return "Пр.Спас. <dc>КС_{dc}</dc> {type}";
        }
  
        // Для остальных ключей используем оригинальные переводы
        return Reflect.get(target, prop, receiver);
      }
    });
  });
  