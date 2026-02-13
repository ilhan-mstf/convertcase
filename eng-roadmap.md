# Engineering Roadmap: Growth-First "Feature Factory"

**Objective:** Rapidly expand the product's SEO footprint by deploying high-intent text and data utilities while maintaining a 100% client-side, privacy-first architecture.

---

## ✅ Phase 1: Text Refiner Pack (COMPLETED)
- **Status:** Shipped 28 localized pages.
- **Tools:** Remove Duplicate Lines, Remove Empty Lines, Extract Emails/URLs, Slugify.
- **Wins:** Established "Shared-Shell" architecture and universal `TextProcessor`.

## ✅ Phase 2: Developer Essentials (COMPLETED)
- **Status:** Shipped 28 localized pages + Vendor integration.
- **Tools:** JSON Prettifier/Minifier, Base64 Converter, JSON <-> YAML, HTML Entities.
- **Wins:** Integrated `js-yaml` locally; implemented `safeExecute` error handling.

## 🚀 Phase 3: Data Janitor Pack (IN PROGRESS)
*Targeting: Data Analysts and Frontend Developers.*

- **Tools to Deploy:**
    - **CSV <-> JSON Converter:** Standard data transformation utility.
    - **Text to HTML List:** Convert raw lines into `<ul><li>` or `<ol><li>` blocks.
    - **Markdown Table Generator:** Convert spreadsheet data into Markdown format.
- **Technical Tactic:** 
    - Implement robust client-side CSV parsing.
    - Automated sitemap regeneration via `scripts/generate_sitemap.py`.

## 📅 Phase 4: Discovery & SEO interlinking (Week 7+)
- **Implementation:**
    - **Tool Directory Grid:** A visual "Library" on the homepage showing all available tools.
    - **Related Tools Sidebar:** Cross-link tools (e.g., "People who used Upper Case also used Slugify").
    - **Instant Tool Search:** A client-side filter to help users find tools by name or keyword.
- **Technical Tactic:** 
    - Create a central `tools-manifest.json` to programmatically generate links and navigation across all sub-pages.

---

## Technical Infrastructure Status
1.  **Universal Tool Template:** ✅ Delivered (`templates/tool-scaffold.html`).
2.  **Shared-Shell UI:** ✅ Delivered (`assets/css/style.css` + `assets/js/app.js`).
3.  **Sitemap Automation:** ✅ Delivered (`scripts/generate_sitemap.py`).

*Prepared by: Head of Engineering*
*Date: February 13, 2026*