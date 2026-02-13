# Engineering Guide: "Feature Factory" Architecture

This document outlines the technical patterns for adding new tools and maintaining the Uppercase platform.

---

## 1. Architectural Pattern: The "Shared-Shell"
To maximize SEO without duplicating code, we use a single asset core and localized "thin wrappers."

### Directory Structure
```text
/assets/
  ├── css/style.css         # Global styles
  └── js/app.js             # Universal TextProcessor engine
/templates/
  └── tool-scaffold.html     # Master template for new tools
/[tool-name]/
  └── index.html            # English landing page
/[lang]/[tool-name]/
  └── index.html            # Localized landing page
```

## 2. Adding a New Tool (Step-by-Step)

### Step 1: Implement Logic
Add the transformation function to `TextProcessor` in `assets/js/app.js`. Ensure it is a pure function and handles errors gracefully.
```javascript
myNewTool: (text) => {
    if (!text) return '';
    // logic here
    return result;
}
```

### Step 2: Register in Controller
Add the tool to the `buttonActions` map in the `DOMContentLoaded` listener.
```javascript
'my-new-tool-btn-id': () => safeExecute(() => TextProcessor.myNewTool(textInput.value)),
```

### Step 3: Create Landing Pages
1. Use `templates/tool-scaffold.html` to create `[tool-name]/index.html`.
2. Set `data-toolset="refiner"` and `data-tool="[tool-id]"` on the `<body>` tag.
3. Add tool-specific buttons and SEO content.

### Step 4: Localize
Replicate the directory structure in `/es/`, `/fr/`, etc., and update asset paths to `../../assets/`.

### Step 5: Update Sitemap
Add the new tool to the `tools` array in `scripts/generate_sitemap.py` and run:
```bash
python3 scripts/generate_sitemap.py > sitemap.xml
```

---

## 3. Best Practices
- **Privacy First:** Never add `fetch()` calls or external trackers.
- **Performance:** For heavy tasks, use `safeExecute` to catch errors without crashing the UI.
- **Accessibility:** Ensure all new buttons have descriptive `title` attributes and `aria-label` tags.
- **WASM Policy:** If a task requires high performance (e.g. image processing), use a locally served `.wasm` module.

---
*Last Updated: February 13, 2026*
