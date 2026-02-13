const assert = require('assert');

// Mock browser globals for HTML encoding/decoding tests
global.document = {
    addEventListener: () => {}, // No-op for tests
    createElement: (tag) => {
        return {
            textContent: '',
            innerHTML: '',
            get innerHTML() { return this._innerHTML || this.textContent; },
            set innerHTML(val) { this._innerHTML = val; },
            get textContent() { return this._textContent || this._innerHTML; },
            set textContent(val) { this._textContent = val; }
        };
    }
};

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

// --- Phase 1: Text Refiner Tests ---
runTest('Remove Duplicates', TextProcessor.removeDuplicateLines('A\nA\nB'), 'A\nB');
runTest('Slugify', TextProcessor.slugify('Hello World!'), 'hello-world');

// --- Phase 2: Developer Essentials Tests ---

// JSON Prettify/Minify
const rawJson = '{"a":1,"b":[1,2]}';
const prettyJson = '{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}';
runTest('JSON Prettify', TextProcessor.jsonPrettify(rawJson), prettyJson);
runTest('JSON Minify', TextProcessor.jsonMinify(prettyJson), rawJson);

// Base64 (Using native btoa/atob or polyfills if needed for Node)
// Node 16+ has btoa/atob globally, or we use Buffer
if (typeof btoa === 'undefined') {
    global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
    global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
}

runTest('Base64 Encode', TextProcessor.base64Encode('hello world'), 'aGVsbG8gd29ybGQ=');
runTest('Base64 Decode', TextProcessor.base64Decode('aGVsbG8gd29ybGQ='), 'hello world');

// HTML Entities (Mocked)
runTest('HTML Encode (Mocked)', TextProcessor.htmlEncode('<script>'), '<script>'); // Mock doesn't actually escape, just verifies flow
runTest('HTML Decode (Mocked)', TextProcessor.htmlDecode('&lt;b&gt;'), '&lt;b&gt;');

// YAML (Mocking jsyaml for Node test)
global.jsyaml = {
    dump: (obj) => "a: 1\nb:\n  - 1\n  - 2\n",
    load: (str) => ({ a: 1 })
};

runTest('JSON to YAML (Mocked)', TextProcessor.jsonToYaml(rawJson), "a: 1\nb:\n  - 1\n  - 2\n");
runTest('YAML to JSON (Mocked)', TextProcessor.yamlToJson("a: 1"), '{\n  "a": 1\n}');

console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);

if (failed > 0) process.exit(1);