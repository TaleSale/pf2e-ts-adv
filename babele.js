// Функция для проверки наличия перевода
function checkTranslation(_this, data) {
    if (!!_this.translations[data._id]) return true;

    if (data.name?.length > 1 && data.name.indexOf('(') > -1 && data.name.indexOf(')') > -1) {
        const match = /(.+)\s\((At Will|Constant)\)$/.exec(data.name);
        if (match) {
            const name = match[1].trim();
            if (!!_this.translations[name]) return true;
        }
    }

    return false;
}

async function __PF2E_TS_init(_this, wrapped, ...args) {
    await wrapped();

    return new Promise((resolve, reject) => {
        for (let metadata of game.data.packs) {
            const collection = `${metadata.packageName}.${metadata.name}`;
            if(_this.supported(metadata)) {
                const translatedCompendium = _this.packs.get(collection);
                const variants = _this.translations.find(t => t.collection === collection)?.variants || [];
                if (translatedCompendium && variants?.length > 0) {
                    translatedCompendium.variants = variants;
                    _this.packs.set(collection, translatedCompendium);
                }
            }
        }
        resolve();
    });
};

function __PF2E_TS_hasTranslation(_this, wrapped, data) {
    return checkTranslation(_this, data) ? true : wrapped(data);
};

function __PF2E_TS_translationsFor(_this, wrapped, data) {
    if (checkTranslation(_this, data)) {
        const match = /(.+)\s\((At Will|Constant)\)$/.exec(data.name);
        if (match) {
            const name = match[1].trim();
            const variant = match[2].trim();
            let data = Object.assign({}, _this.translations[name]);
            const translatedName = data.name;
            const translatedVariant = `(${variant})`;
            
            if (data['variants'] || _this.variants) {
                for (let v of data['variants'] || _this.variants || []) {
                    if (v.id === variant) {
                        data = Object.assign(data, v);
                        break;
                    }
                }
            }

            data.name = `${translatedName} ${translatedVariant}`;
            return data;
        }
    }

    return wrapped(data);
}

Hooks.on('init', () => {
    if (typeof libWrapper === 'function') {
        libWrapper.register('pf2e-ts-adv', 'Babele.prototype.init', async function (wrapped, ...args) {
            return __PF2E_TS_init(this, wrapped, ...args);
        }, 'WRAPPER');
        libWrapper.register('pf2e-ts-adv', 'TranslatedCompendium.prototype.hasTranslation', function (wrapped, ...args) {
            return __PF2E_TS_hasTranslation(this, wrapped, ...args);
        }, 'MIXED');
        libWrapper.register('pf2e-ts-adv', 'TranslatedCompendium.prototype.translationsFor', function (wrapped, ...args) {
            return __PF2E_TS_translationsFor(this, wrapped, ...args);
        }, 'MIXED');
    }

    if(typeof Babele !== 'undefined') {
        Babele.get().register({
            module: 'pf2e-ts-adv',
            lang: 'ru',
            dir: 'compendium'
        });
    }
});

 