Hooks.on('renderJournalSheet', (app, html, data) => {
    const tsButton = $(`<button type="button" name="ts" title="TS"><i class="fas fa-music"></i>TS</button>`);
    html.find('.editor-content').append(tsButton);
    tsButton.click((ev) => {
        // Вставьте здесь код, который должен выполняться при нажатии на кнопку
    });
});
