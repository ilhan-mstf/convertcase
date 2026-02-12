# Engineering Implementation Plan: Phase 1 (Text Refiner Pack)

## 1. Objective
Deploy the "Text Refiner" tools using a **Shared-Shell Architecture**. This ensures maximum SEO surface area (dedicated pages) while maintaining a single, scalable codebase.

## 2. Technical Architecture: The "Shared-Shell"
Instead of duplicating logic, we will refactor the existing `script.js` into a Universal Controller.

### 2.1 Refactoring `script.js` -> `assets/js/app.js`
- **Tool Registry:** Create a map of transformation functions (e.g., `removeDuplicates`, `slugify`).
- **Auto-Activation:** The script will detect the required toolset via a `data-toolset` attribute on the `<body>` tag.
- **Stat Engine:** Keep the existing word/char/line counter as a global utility for all tools.

### 2.2 Global Asset Consolidation
```text
/assets/
  ├── css/style.css         # Shared premium UI
  └── js/app.js             # Universal logic (Case + Refiners)
/index.html                 # Case Converter (Default)
/remove-duplicate-lines/
  └── index.html            # Thin wrapper, data-toolset="refiner"
/slugify-text/
  └── index.html            # Thin wrapper, data-toolset="refiner"
```

## 3. Integration with Existing Localization
We will maintain the `/es/`, `/fr/`, etc. structure. When a new tool like "Slugify" is added, we will create:
1. `/slugify-text/index.html` (English)
2. `/es/slugify-text/index.html` (Spanish)
Each will point back to the central `/assets/` directory.

## 4. Execution Tasks

### Task 1: Refactor "CaseConverter" to "TextProcessor" (Day 1)
- [ ] Rename `CaseConverter` in `script.js` to `TextProcessor`.
- [ ] Add Phase 1 functions: `removeDuplicates`, `removeEmptyLines`, `extractEntities`, `slugify`.
- [ ] Implement a dynamic button renderer that reads a configuration object based on the current page.

### Task 2: Create the "Thin Wrapper" Template (Day 2)
- [ ] Create a master template that includes the shared header, stats bar, and footer.
- [ ] Ensure the template has placeholders for SEO content (H1, text articles).

### Task 3: Deploy the Text Refiner Pack (Day 3-5)
- [ ] **Day 3:** Launch "Remove Duplicate Lines" and "Remove Empty Lines".
- [ ] **Day 4:** Launch "Extract Emails/URLs" and "Slugify".
- [ ] **Day 5:** Update `sitemap.xml` and verify internal linking grid across all 7 languages.

## 5. Definition of Done
1.  All new tools share the same CSS and JS files.
2.  Each tool has a dedicated, SEO-optimized URL.
3.  The main "Convert Case" features remain untouched and functional.
4.  Performance: Pages load in <1s with 100% offline capability (PWA ready).

---
*Prepared by: Principal Software Engineer*
*Date: February 12, 2026*