const CaseConverter = {
    sentenceCase: (text, lang) => {
        let lowerText = text.toLocaleLowerCase(lang);
        // Capitalize first letter of sentences
        lowerText = lowerText.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toLocaleUpperCase(lang));
        // English specific: Capitalize standalone 'i'
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
        // Use negative lookbehind to avoid capitalizing after apostrophes (fixes "It's")
        // Supported in modern browsers and Node.js
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
        // Small words for different languages
        const smallWordsMap = {
            'en': /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v\.?|vs\.?|via)$/i,
            'es': /^(a|ante|bajo|cabe|con|contra|de|desde|durante|en|entre|hacia|hasta|mediante|para|por|según|sin|so|sobre|tras|versus|via|el|la|los|las|un|una|unos|unas|y|o|pero|si|e|u)$/i,
            'pt': /^(a|ao|aos|as|à|às|ante|após|até|com|contra|de|da|do|das|dos|desde|em|entre|para|per|perante|por|sem|sob|sobre|trás|o|os|um|uma|uns|umas|e|ou|mas|se|na|no|nas|nos|pelo|pela|pelos|pelas|num|numa|nuns|numas)$/i,
            'fr': /^(à|au|aux|avec|ce|ces|dans|de|des|du|elle|en|et|eux|il|je|la|le|les|leur|lui|ma|mais|me|mes|moi|mon|ne|nos|notre|nous|on|ou|où|par|pas|pour|qu|que|qui|sa|se|ses|son|sur|ta|te|tes|toi|ton|tu|un|une|vos|votre|vous|c|d|j|l|m|n|s|t|y)$/i,
            'de': /^(aber|als|am|an|auch|auf|aus|bei|bin|bis|bist|da|dad|darum|das|daß|dass|dein|deine|dem|den|der|des|dessen|dich|die|dies|diese|diesem|diesen|dieser|dieses|doch|dort|du|durch|ein|eine|einem|einen|einer|eines|er|es|euer|eure|für|hatte|hatten|hattest|hattet|hier|hinter|ich|ihr|ihre|im|in|ist|ja|jede|jedem|jeden|jeder|jedes|jener|jenes|jetzt|kann|kannst|können|könnt|machen|mein|meine|mit|muss|musst|musßt|müssen|müsst|nach|nachdem|nein|nicht|nun|oder|seid|sein|seine|sich|sie|sind|soll|sollen|sollst|sollt|sonst|soweit|sowie|und|unser|unsere|unter|vom|von|vor|wann|warum|was|weiter|weitere|wenn|wer|werde|werden|werdet|weshalb|wie|wieder|wieso|wir|wird|wirst|wo|worden|woher|wohin|zu|zum|zur|über)$/i,
            'tr': /^(ve|ile|de|da|ki|mi|mı|mu|mü|ama|fakat|lakin|veya|ya|yahut|ise|için|gibi|kadar|göre|diye|doğru|karşı|üzere|sanki|oysa|madem|belki|çünkü|zira|yoksa|ancak|yalnız|tek|bir|bu|şu|o)$/i,
            'it': /^(a|agli|ai|al|all|alla|alle|allo|con|da|dagli|dai|dal|dall|dalla|dalle|dallo|di|degli|dei|del|dell|della|delle|dello|e|ed|i|il|in|la|le|lo|ma|nei|nel|nell|nella|nelle|nello|o|od|per|se|su|sugli|sui|sul|sull|sulla|sulle|sullo|tra|fra|un|una|uno)$/i
        };

        const smallWords = smallWordsMap[lang] || smallWordsMap['en'];

        return text.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
            // Check if it's a small word and NOT at the beginning or end of the title
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLocaleLowerCase(lang);
            }

            // If it contains uppercase letters after the first one, or internal punctuation,
            // we assume it's an acronym or special case (like iPhone) and leave it as is.
            if (match.substr(1).search(/[A-Z\u00C0-\u00FF]|\../) > -1) {
                return match;
            }

            // Otherwise, capitalize first letter and lowercase the rest
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

    getStats: (text) => {
        return {
            charCount: text.length,
            wordCount: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
            // Matches . ! ? followed by space or end of string
            sentenceCount: text.trim() === '' ? 0 : text.split(/[.!?]+(\s|$)/).filter(s => s.trim().length > 0).length,
            lineCount: text === '' ? 0 : text.split(/\n/).length
        };
    }
};

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaseConverter;
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
            const stats = CaseConverter.getStats(text);

            charCount.textContent = stats.charCount;
            wordCount.textContent = stats.wordCount;
            sentenceCount.textContent = stats.sentenceCount;
            lineCount.textContent = stats.lineCount;
        }

        textInput.addEventListener('input', updateStats);

        // Conversion Functions
        function setContent(newText) {
            textInput.value = newText;
            updateStats();
        }

        document.getElementById('sentence').addEventListener('click', () => {
            setContent(CaseConverter.sentenceCase(textInput.value, lang));
        });

        document.getElementById('lower').addEventListener('click', () => {
            setContent(CaseConverter.lowerCase(textInput.value, lang));
        });

        document.getElementById('upper').addEventListener('click', () => {
            setContent(CaseConverter.upperCase(textInput.value, lang));
        });

        document.getElementById('capitalized').addEventListener('click', () => {
            setContent(CaseConverter.capitalizedCase(textInput.value, lang));
        });

        document.getElementById('alternating').addEventListener('click', () => {
            setContent(CaseConverter.alternatingCase(textInput.value, lang));
        });

        document.getElementById('title').addEventListener('click', () => {
            setContent(CaseConverter.titleCase(textInput.value, lang));
        });

        document.getElementById('inverse').addEventListener('click', () => {
            setContent(CaseConverter.inverseCase(textInput.value, lang));
        });

        // Actions
        document.getElementById('download').addEventListener('click', () => {
            const text = textInput.value;
            if (!text) return;

            const blob = new Blob([text], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'convertcase-text.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });

        document.getElementById('copy').addEventListener('click', () => {
            const text = textInput.value;
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                const btn = document.getElementById('copy');
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });

        document.getElementById('clear').addEventListener('click', () => {
            setContent('');
        });
    });
}
