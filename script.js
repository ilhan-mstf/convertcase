document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const sentenceCount = document.getElementById('sentence-count');
    const lineCount = document.getElementById('line-count');

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
        const text = textInput.value.toLowerCase();
        const newText = text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        setContent(newText);
    });

    document.getElementById('lower').addEventListener('click', () => {
        setContent(textInput.value.toLowerCase());
    });

    document.getElementById('upper').addEventListener('click', () => {
        setContent(textInput.value.toUpperCase());
    });

    document.getElementById('capitalized').addEventListener('click', () => {
        const text = textInput.value.toLowerCase();
        const newText = text.replace(/\b\w/g, c => c.toUpperCase());
        setContent(newText);
    });

    document.getElementById('alternating').addEventListener('click', () => {
        const text = textInput.value;
        let newText = '';
        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0) {
                newText += text[i].toLowerCase();
            } else {
                newText += text[i].toUpperCase();
            }
        }
        setContent(newText);
    });

    document.getElementById('title').addEventListener('click', () => {
        const text = textInput.value.toLowerCase();
        // Simple title case implementation
        // Exclude small words unless they are the first word
        const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
        
        const newText = text.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }
            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }
            return match.charAt(0).toUpperCase() + match.substr(1);
        });
        setContent(newText);
    });

    document.getElementById('inverse').addEventListener('click', () => {
        const text = textInput.value;
        let newText = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === char.toUpperCase()) {
                newText += char.toLowerCase();
            } else {
                newText += char.toUpperCase();
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
