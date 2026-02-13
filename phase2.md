# Engineering Implementation Plan: Phase 2 (Developer Essentials)

## 1. Objective
Deploy high-utility developer tools to capture technical search traffic. This phase involves integrating external (local) libraries for data serialization (YAML) and expanding the `TextProcessor` for encoding/decoding tasks.

## 2. Tools & Logic

| Tool | Technical Implementation |
| :--- | :--- |
| **JSON Prettifier / Minifier** | Native `JSON.parse` + `JSON.stringify(obj, null, 2)` (Prettify) / `JSON.stringify(obj)` (Minify). |
| **Base64 Encoder / Decoder** | Native `btoa()` (Encode) and `atob()` (Decode). |
| **JSON <-> YAML Converter** | Integration of `js-yaml` library (v4.1.0). |
| **HTML Entity Encoder/Decoder** | DOM-based escaping/unescaping or regex-based map. |

## 3. Vendor Asset Management
To maintain the privacy promise, all libraries must be served locally.
- **Path:** `assets/js/vendor/js-yaml.min.js`
- **Inclusion:** Only included in pages that require it (YAML converter).

## 4. Universal Controller Updates (`app.js`)
- Extend `TextProcessor` with:
    - `jsonPrettify(text)`
    - `jsonMinify(text)`
    - `base64Encode(text)`
    - `base64Decode(text)`
    - `htmlEncode(text)`
    - `htmlDecode(text)`
    - `jsonToYaml(text)`
    - `yamlToJson(text)`

## 5. Deployment Roadmap

### Task 1: Setup & Vendor Integration (Day 1)
- [ ] Create `assets/js/vendor/` directory.
- [ ] Download `js-yaml.min.js` and verify its integrity.
- [ ] Update `assets/js/app.js` to support conditional library loading or global availability for refiners.

### Task 2: Implement Phase 2 Logic (Day 2)
- [ ] Add the encoding/decoding and formatting functions to `TextProcessor`.
- [ ] Implement error handling for invalid JSON/YAML inputs (UI feedback).

### Task 3: Deploy Tool Pages (Day 3-4)
- [ ] Create directories and `index.html` wrappers for:
    - `/json-prettifier-minifier/`
    - `/base64-encode-decode/`
    - `/json-yaml-converter/`
    - `/html-entity-encoder-decoder/`
- [ ] Localize all 4 tools across 7 languages (28 new pages).

### Task 4: SEO & Discovery (Day 5)
- [ ] Update `scripts/generate_sitemap.py` with Phase 2 tool paths.
- [ ] Update tool directory footer links.
- [ ] Regenerate `sitemap.xml`.

## 6. Definition of Done
1.  All Phase 2 tools functional on all 7 localized versions.
2.  Zero network calls during data transformation.
3.  Invalid inputs (e.g., broken JSON) show a non-intrusive error message.
4.  Performance: Large JSON strings (1MB+) process without locking the UI thread.

---
*Prepared by: Principal Software Engineer*
*Date: February 12, 2026*
