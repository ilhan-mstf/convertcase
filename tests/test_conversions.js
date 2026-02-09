const assert = require('assert');
const CaseConverter = require('../script.js');

console.log('Running Tests...');

let passed = 0;
let failed = 0;

function runTest(name, actual, expected) {
    try {
        assert.strictEqual(actual, expected);
        console.log(`✅ [PASS] ${name}`);
        passed++;
    } catch (e) {
        console.error(`❌ [FAIL] ${name}`);
        console.error(`   Expected: "${expected}"`);
        console.error(`   Actual:   "${actual}"`);
        failed++;
    }
}

// --- Sentence Case Tests ---

// Bug: "i" to "I" in English
runTest('Sentence Case (EN): i -> I', 
    CaseConverter.sentenceCase('i am here. i think so.', 'en'), 
    'I am here. I think so.'
);

runTest('Sentence Case (EN): inner i -> I', 
    CaseConverter.sentenceCase('you and i are friends.', 'en'), 
    'You and I are friends.'
);

// Turkish special characters
runTest('Sentence Case (TR): i -> İ', 
    CaseConverter.sentenceCase('istanbul', 'tr'), 
    'İstanbul'
);

// Standard sentence case
runTest('Sentence Case (ES): Standard', 
    CaseConverter.sentenceCase('hola mundo. todo bien.', 'es'), 
    'Hola mundo. Todo bien.'
);


// --- Capitalized Case Tests ---

// Bug: Apostrophe handling
runTest("Capitalized Case (EN): it's -> It's", 
    CaseConverter.capitalizedCase("it's a test", 'en'), 
    "It's A Test"
);

runTest("Capitalized Case (EN): don't -> Don't", 
    CaseConverter.capitalizedCase("don't stop", 'en'), 
    "Don't Stop"
);

// Standard capitalized case
runTest('Capitalized Case (EN): hello world', 
    CaseConverter.capitalizedCase("hello world", 'en'), 
    "Hello World"
);

// --- Upper Case Tests ---

runTest('Upper Case (EN): standard', 
    CaseConverter.upperCase('hello world', 'en'), 
    'HELLO WORLD'
);

runTest('Upper Case (TR): dotted i -> İ', 
    CaseConverter.upperCase('istanbul', 'tr'), 
    'İSTANBUL'
);

runTest('Upper Case (TR): dotless ı -> I', 
    CaseConverter.upperCase('bakı', 'tr'), 
    'BAKI'
);

runTest('Upper Case (DE): ß -> SS', 
    CaseConverter.upperCase('fußball', 'de'), 
    'FUSSBALL'
);

runTest('Upper Case (FR): accented characters', 
    CaseConverter.upperCase('été déjà ÇA', 'fr'), 
    'ÉTÉ DÉJÀ ÇA'
);

runTest('Upper Case (ES): ñ -> Ñ', 
    CaseConverter.upperCase('mañana', 'es'), 
    'MAÑANA'
);

runTest('Upper Case (PT): ç/ã -> Ç/Ã', 
    CaseConverter.upperCase('coração', 'pt'), 
    'CORAÇÃO'
);

// --- Title Case Tests ---

runTest('Title Case (EN): small words', 
    CaseConverter.titleCase('the king of the hill', 'en'), 
    'The King of the Hill'
);

runTest('Title Case (EN): preserve acronyms', 
    CaseConverter.titleCase('NASA is exploring Mars', 'en'), 
    'NASA Is Exploring Mars'
);

runTest('Title Case (EN): mixed case acronyms', 
    CaseConverter.titleCase('an iPhone app', 'en'), 
    'An iPhone App'
);

// --- Alternating Case Tests ---

runTest('Alternating Case (EN): hi there', 
    CaseConverter.alternatingCase('hi there', 'en'), 
    'hI tHeRe'
);

runTest('Alternating Case (EN): punctuation', 
    CaseConverter.alternatingCase('a!b?c', 'en'), 
    'a!B?c'
);

// --- Lower Case Tests ---

runTest('Lower Case (EN): standard', 
    CaseConverter.lowerCase('HELLO World', 'en'), 
    'hello world'
);

// --- Inverse Case Tests ---

runTest('Inverse Case (EN): standard', 
    CaseConverter.inverseCase('HeLLo WoRLd', 'en'), 
    'hEllO wOrlD'
);

// --- Text Statistics Tests ---

const emptyStats = CaseConverter.getStats('');
runTest('Stats: Empty string', 
    JSON.stringify(emptyStats), 
    JSON.stringify({ charCount: 0, wordCount: 0, sentenceCount: 0, lineCount: 0 })
);

const simpleStats = CaseConverter.getStats('Hello world.');
runTest('Stats: Simple sentence', 
    JSON.stringify(simpleStats), 
    JSON.stringify({ charCount: 12, wordCount: 2, sentenceCount: 1, lineCount: 1 })
);

const multiLineStats = CaseConverter.getStats('Line 1\nLine 2');
runTest('Stats: Multiline', 
    JSON.stringify(multiLineStats), 
    JSON.stringify({ charCount: 13, wordCount: 4, sentenceCount: 1, lineCount: 2 })
);

console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);

if (failed > 0) process.exit(1);