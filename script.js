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

        // Character Count
        charCount.textContent = text.length;

        // Word Count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        wordCount.textContent = words;

        // Sentence Count
        // Matches . ! ? followed by space or end of string
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+(\s|$)/).filter(s => s.trim().length > 0).length;
        sentenceCount.textContent = sentences;

        // Line Count
        const lines = text === '' ? 0 : text.split(/\n/).length;
        lineCount.textContent = lines;
    }

    textInput.addEventListener('input', updateStats);

    // Conversion Functions
    function setContent(newText) {
        textInput.value = newText;
        updateStats();
    }

    document.getElementById('sentence').addEventListener('click', () => {
        const text = textInput.value.toLocaleLowerCase(lang);
        const newText = text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toLocaleUpperCase(lang));
        setContent(newText);
    });

    document.getElementById('lower').addEventListener('click', () => {
        setContent(textInput.value.toLocaleLowerCase(lang));
    });

    document.getElementById('upper').addEventListener('click', () => {
        setContent(textInput.value.toLocaleUpperCase(lang));
    });

    document.getElementById('capitalized').addEventListener('click', () => {
        const text = textInput.value.toLocaleLowerCase(lang);
        const newText = text.replace(/\b\w/g, c => c.toLocaleUpperCase(lang));
        setContent(newText);
    });

    document.getElementById('alternating').addEventListener('click', () => {
        const text = textInput.value;
        let newText = '';
        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0) {
                newText += text[i].toLocaleLowerCase(lang);
            } else {
                newText += text[i].toLocaleUpperCase(lang);
            }
        }
        setContent(newText);
    });

    document.getElementById('title').addEventListener('click', () => {
        const text = textInput.value.toLocaleLowerCase(lang);

        // Small words for different languages
        const smallWordsMap = {
            'en': /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v\.?|vs\.?|via)$/i,
            'es': /^(a|ante|bajo|cabe|con|contra|de|desde|durante|en|entre|hacia|hasta|mediante|para|por|según|sin|so|sobre|tras|versus|via|el|la|los|las|un|una|unos|unas|y|o|pero|si|e|u)$/i,
            'pt': /^(a|ao|aos|as|à|às|ante|após|até|com|contra|de|da|do|das|dos|desde|em|entre|para|per|perante|por|sem|sob|sobre|trás|o|os|um|uma|uns|umas|e|ou|mas|se|na|no|nas|nos|pelo|pela|pelos|pelas|num|numa|nuns|numas)$/i,
            'fr': /^(à|au|aux|avec|ce|ces|dans|de|des|du|elle|en|et|eux|il|je|la|le|les|leur|lui|ma|mais|me|mes|moi|mon|ne|nos|notre|nous|on|ou|où|par|pas|pour|qu|que|qui|sa|se|ses|son|sur|ta|te|tes|toi|ton|tu|un|une|vos|votre|vous|c|d|j|l|m|n|s|t|y)$/i,
            'de': /^(aber|als|am|an|auch|auf|aus|bei|bin|bis|bist|da|dad|darum|das|daß|dass|dein|deine|dem|den|der|des|dessen|dich|die|dies|diese|diesem|diesen|dieser|dieses|doch|dort|du|durch|ein|eine|einem|einen|einer|eines|er|es|euer|eure|für|hatte|hatten|hattest|hattet|hier|hinter|ich|ihr|ihre|im|in|ist|ja|jede|jedem|jeden|jeder|jedes|jener|jenes|jetzt|kann|kannst|können|könnt|machen|mein|meine|mit|muss|musst|musßt|müssen|müsst|nach|nachdem|nein|nicht|nun|oder|seid|sein|seine|sich|sie|sind|soll|sollen|sollst|sollt|sonst|soweit|sowie|und|unser|unsere|unter|vom|von|vor|wann|warum|was|weiter|weitere|wenn|wer|werde|werden|werdet|weshalb|wie|wieder|wieso|wir|wird|wirst|wo|woher|wohin|zu|zum|zur|über)$/i,
            'tr': /^(ve|ile|de|da|ki|mi|mı|mu|mü|ama|fakat|lakin|veya|ya|yahut|ise|için|gibi|kadar|göre|diye|doğru|karşı|üzere|sanki|oysa|madem|belki|çünkü|zira|yoksa|ancak|yalnız|tek|bir|bu|şu|o)$/i,
            'it': /^(a|agli|ai|al|all|alla|alle|allo|con|da|dagli|dai|dal|dall|dalla|dalle|dallo|di|degli|dei|del|dell|della|delle|dello|e|ed|i|il|in|la|le|lo|ma|nei|nel|nell|nella|nelle|nello|o|od|per|se|su|sugli|sui|sul|sull|sulla|sulle|sullo|tra|fra|un|una|uno)$/i
        };

        const smallWords = smallWordsMap[lang] || smallWordsMap['en'];

        const newText = text.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLocaleLowerCase(lang);
            }
            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }
            return match.charAt(0).toLocaleUpperCase(lang) + match.substr(1);
        });
        setContent(newText);
    });

    document.getElementById('inverse').addEventListener('click', () => {
        const text = textInput.value;
        let newText = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === char.toLocaleUpperCase(lang)) {
                newText += char.toLocaleLowerCase(lang);
            } else {
                newText += char.toLocaleUpperCase(lang);
            }
        }
        setContent(newText);
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
