const assert = require('assert');
const TextProcessor = require('../assets/js/app.js');

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

// --- Case Conversion Tests ---

runTest('Sentence Case (EN): i am here.', 
    TextProcessor.sentenceCase('i am here. i think so.', 'en'), 
    'I am here. I think so.'
);

runTest('Upper Case (TR): istanbul', 
    TextProcessor.upperCase('istanbul', 'tr'), 
    'İSTANBUL'
);

runTest('Slugify: Hello World!', 
    TextProcessor.slugify('Hello World!'), 
    'hello-world'
);

// --- Phase 1: Text Refiner Tests ---

runTest('Remove Duplicates: mixed list', 
    TextProcessor.removeDuplicateLines('A\nB\nA\nC\nB'), 
    'A\nB\nC'
);

runTest('Remove Duplicates: with CRLF', 
    TextProcessor.removeDuplicateLines('A\r\nB\r\nA'), 
    'A\nB'
);

runTest('Remove Empty Lines: mixed', 
    TextProcessor.removeEmptyLines('Line 1\n\nLine 2\n   \nLine 3'), 
    'Line 1\nLine 2\nLine 3'
);

runTest('Extract Emails: valid list', 
    TextProcessor.extractEntities('Contact me at test@example.com or info@site.org', 'emails'), 
    'test@example.com\ninfo@site.org'
);

runTest('Extract Emails: no emails', 
    TextProcessor.extractEntities('No emails here', 'emails'), 
    ''
);

runTest('Extract URLs: mixed text', 
    TextProcessor.extractEntities('Check https://google.com and http://blog.dev/post', 'urls'), 
    'https://google.com\nhttp://blog.dev/post'
);

runTest('Slugify: Complex string', 
    TextProcessor.slugify('  My Awesome Blog Post #2025!  '), 
    'my-awesome-blog-post-2025'
);

// --- Text Statistics Tests ---

const simpleStats = TextProcessor.getStats('Hello world.');
runTest('Stats: Simple sentence', 
    JSON.stringify(simpleStats), 
    JSON.stringify({ charCount: 12, wordCount: 2, sentenceCount: 1, lineCount: 1 })
);

console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);

if (failed > 0) process.exit(1);
