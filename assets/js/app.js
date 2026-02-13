const TextProcessor = {
    // Case Conversion Functions
    sentenceCase: (text, lang) => {
        let lowerText = text.toLocaleLowerCase(lang);
        lowerText = lowerText.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toLocaleUpperCase(lang));
        if (lang === 'en') {
            lowerText = lowerText.replace(/\bi\b/g, 'I');
        }
        return lowerText;
    },

    lowerCase: (text, lang) => {
        return text.toLocaleLowerCase(lang);
    },

    upperCase: (text, lang) => {
        return text.toLocaleUpperCase(lang);
    },

    capitalizedCase: (text, lang) => {
        const lowerText = text.toLocaleLowerCase(lang);
        return lowerText.replace(/(?<!['\u2019])\b\w/g, c => c.toLocaleUpperCase(lang));
    },

    alternatingCase: (text, lang) => {
        let newText = '';
        let letterCount = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/\p{L}/u.test(char)) {
                if (letterCount % 2 === 0) {
                    newText += char.toLocaleLowerCase(lang);
                } else {
                    newText += char.toLocaleUpperCase(lang);
                }
                letterCount++;
            } else {
                newText += char;
            }
        }
        return newText;
    },

    titleCase: (text, lang) => {
        const smallWordsMap = {
            'en': /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v\.?|vs\.?|via)$/i,
            'es': /^(a|ante|bajo|cabe|con|contra|de|desde|durante|en|entre|hacia|hasta|mediante|para|por|según|sin|so|sobre|tras|versus|via|el|la|los|las|un|una|unos|unas|y|o|pero|si|e|u)$/i,
            'pt': /^(a|ao|aos|as|à|às|ante|após|até|com|contra|de|da|do|das|dos|desde|em|entre|para|per|perante|por|sem|sob|sobre|trás|o|os|um|uma|uns|umas|e|ou|mas|se|na|no|nas|nos|pelo|pela|pelos|pelas|num|numa|nuns|numas)$/i,
            'fr': /^(à|au|aux|avec|ce|ces|dans|de|des|du|elle|en|et|eux|il|je|la|le|les|leur|lui|ma|mais|me|mes|moi|mon|ne|nos|notre|nous|on|ou|où|par|pas|pour|qu|que|qui|sa|se|ses|son|sur|ta|te|tes|toi|ton|tu|un|une|vos|votre|vous|c|d|j|l|m|n|s|t|y)$/i,
            'de': /^(aber|als|am|an|auch|auf|aus|bei|bin|bis|bist|da|dad|darum|das|daß|dass|dein|deine|dem|den|der|des|dessen|dich|die|dies|diese|diesem|diesen|dieser|dieses|doch|dort|du|durch|ein|eine|einem|einen|er|es|euer|eure|für|hatte|hatten|hattest|hattet|hier|hinter|ich|ihr|ihre|im|in|ist|ja|jede|jedem|jeden|jeder|jedes|jener|jenes|jetzt|kann|kannst|können|könnt|machen|mein|meine|mit|muss|musst|musßt|müssen|müsst|nach|nachdem|nein|nicht|nun|oder|seid|sein|seine|sich|sie|sind|soll|sollen|sollst|sollt|sonst|soweit|sowie|und|unser|unsere|unter|vom|von|vor|wann|warum|was|weiter|weitere|wenn|wer|werde|werden|werdet|weshalb|wie|wieder|wieso|wir|wird|wirst|wo|worden|woher|wohin|zu|zum|zur|über)$/i,
            'tr': /^(ve|ile|de|da|ki|mi|mı|mu|mü|ama|fakat|lakin|veya|ya|yahut|ise|için|gibi|kadar|göre|diye|doğru|karşı|üzere|sanki|oysa|madem|belki|çünkü|zira|yoksa|ancak|yalnız|tek|bir|bu|şu|o)$/i,
            'it': /^(a|agli|ai|al|all|alla|alle|allo|con|da|dagli|dai|dal|dall|dalla|dalle|dallo|di|degli|dei|del|dell|della|delle|dello|e|ed|i|il|in|la|le|lo|ma|nei|nel|nell|nella|nelle|nello|o|od|per|se|su|sugli|sui|sul|sull|sulla|sulle|sullo|tra|fra|un|una|uno)$/i
        };
        const smallWords = smallWordsMap[lang] || smallWordsMap['en'];
        return text.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLocaleLowerCase(lang);
            }
            if (match.substr(1).search(/[A-Z\u00C0-\u00FF]|\../) > -1) {
                return match;
            }
            return match.charAt(0).toLocaleUpperCase(lang) + match.substr(1).toLocaleLowerCase(lang);
        });
    },

    inverseCase: (text, lang) => {
        let newText = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === char.toLocaleUpperCase(lang)) {
                newText += char.toLocaleLowerCase(lang);
            } else {
                newText += char.toLocaleUpperCase(lang);
            }
        }
        return newText;
    },

    // Phase 1: Text Refiner Functions
    removeDuplicateLines: (text) => {
        const lines = text.split(/\r?\n/);
        return Array.from(new Set(lines)).join('\n');
    },

    removeEmptyLines: (text) => {
        return text.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');
    },

    slugify: (text) => {
        return text.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    extractEntities: (text, type) => {
        if (type === 'emails') {
            const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
            return matches ? matches.join('\n') : '';
        } else if (type === 'urls') {
            const matches = text.match(/https?:\/\/[^\s/$.?#].[^\s]*/g);
            return matches ? matches.join('\n') : '';
        }
        return text;
    },

    // Phase 2: Developer Essentials
    jsonPrettify: (text) => {
        try {
            const obj = JSON.parse(text);
            return JSON.stringify(obj, null, 2);
        } catch (e) {
            throw new Error('Invalid JSON: ' + e.message);
        }
    },

    jsonMinify: (text) => {
        try {
            const obj = JSON.parse(text);
            return JSON.stringify(obj);
        } catch (e) {
            throw new Error('Invalid JSON: ' + e.message);
        }
    },

    base64Encode: (text) => {
        try {
            return btoa(unescape(encodeURIComponent(text)));
        } catch (e) {
            throw new Error('Encoding failed: ' + e.message);
        }
    },

    base64Decode: (text) => {
        try {
            return decodeURIComponent(escape(atob(text)));
        } catch (e) {
            throw new Error('Invalid Base64 string');
        }
    },

    htmlEncode: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    htmlDecode: (text) => {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent;
    },

    jsonToYaml: (text) => {
        try {
            const obj = JSON.parse(text);
            if (typeof jsyaml !== 'undefined') {
                return jsyaml.dump(obj);
            }
            // If js-yaml is not loaded yet (fallback or warning)
            return 'Library js-yaml not loaded.';
        } catch (e) {
            throw new Error('Invalid JSON: ' + e.message);
        }
    },

    yamlToJson: (text) => {
        try {
            if (typeof jsyaml !== 'undefined') {
                const obj = jsyaml.load(text);
                return JSON.stringify(obj, null, 2);
            }
            return 'Library js-yaml not loaded.';
        } catch (e) {
            throw new Error('Invalid YAML: ' + e.message);
        }
    },

    getStats: (text) => {
        return {
            charCount: text.length,
            wordCount: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
            sentenceCount: text.trim() === '' ? 0 : text.split(/[.!?]+(\s|$)/).filter(s => s.trim().length > 0).length,
            lineCount: text === '' ? 0 : text.split(/\n/).length
        };
    }
};

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextProcessor;
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const textInput = document.getElementById('text-input');
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        const sentenceCount = document.getElementById('sentence-count');
        const lineCount = document.getElementById('line-count');
        const lang = document.documentElement.lang || 'en';

        // Stats Update
        function updateStats() {
            const text = textInput.value;
            const stats = TextProcessor.getStats(text);
            charCount.textContent = stats.charCount;
            wordCount.textContent = stats.wordCount;
            sentenceCount.textContent = stats.sentenceCount;
            lineCount.textContent = stats.lineCount;
        }

        if (textInput) {
            textInput.addEventListener('input', updateStats);
        }

        function setContent(newText) {
            textInput.value = newText;
            updateStats();
        }

        function handleError(error) {
            // Simple alert for now, can be improved to a toast/UI message
            alert(error.message);
        }

        function safeExecute(fn) {
            try {
                const result = fn();
                if (result !== undefined) setContent(result);
            } catch (e) {
                handleError(e);
            }
        }

        // Mapping button IDs to functions
        const buttonActions = {
            'sentence': () => setContent(TextProcessor.sentenceCase(textInput.value, lang)),
            'lower': () => setContent(TextProcessor.lowerCase(textInput.value, lang)),
            'upper': () => setContent(TextProcessor.upperCase(textInput.value, lang)),
            'capitalized': () => setContent(TextProcessor.capitalizedCase(textInput.value, lang)),
            'alternating': () => setContent(TextProcessor.alternatingCase(textInput.value, lang)),
            'title': () => setContent(TextProcessor.titleCase(textInput.value, lang)),
            'inverse': () => setContent(TextProcessor.inverseCase(textInput.value, lang)),
            
            // Phase 1 tools
            'remove-duplicates': () => setContent(TextProcessor.removeDuplicateLines(textInput.value)),
            'remove-empty-lines': () => setContent(TextProcessor.removeEmptyLines(textInput.value)),
            'slugify': () => setContent(TextProcessor.slugify(textInput.value)),
            'extract-emails': () => setContent(TextProcessor.extractEntities(textInput.value, 'emails')),
            'extract-urls': () => setContent(TextProcessor.extractEntities(textInput.value, 'urls')),

            // Phase 2 tools
            'json-prettify': () => safeExecute(() => TextProcessor.jsonPrettify(textInput.value)),
            'json-minify': () => safeExecute(() => TextProcessor.jsonMinify(textInput.value)),
            'base64-encode': () => safeExecute(() => TextProcessor.base64Encode(textInput.value)),
            'base64-decode': () => safeExecute(() => TextProcessor.base64Decode(textInput.value)),
            'html-encode': () => safeExecute(() => TextProcessor.htmlEncode(textInput.value)),
            'html-decode': () => safeExecute(() => TextProcessor.htmlDecode(textInput.value)),
            'json-to-yaml': () => safeExecute(() => TextProcessor.jsonToYaml(textInput.value)),
            'yaml-to-json': () => safeExecute(() => TextProcessor.yamlToJson(textInput.value))
        };

        // Attach listeners
        Object.keys(buttonActions).forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', buttonActions[id]);
            }
        });

        // Global Actions
        const downloadBtn = document.getElementById('download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const text = textInput.value;
                if (!text) return;
                const blob = new Blob([text], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = (document.body.getAttribute('data-tool') || 'convertcase') + '-text.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
        }

        const copyBtn = document.getElementById('copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const text = textInput.value;
                if (!text) return;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                });
            });
        }

        const clearBtn = document.getElementById('clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => setContent(''));
        }
    });
}
