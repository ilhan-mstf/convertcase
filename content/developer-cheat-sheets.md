# The Developer’s String Manipulation Cheat Sheet

Whether you're cleaning logs, formatting API responses, or slugifying URLs, string manipulation is a daily task. This cheat sheet covers the most common transformations in **JavaScript**, **Python**, and **CSS**.

---

## 1. UPPERCASE & lower case
The basics of text normalization.

### JavaScript
```javascript
const text = "Hello World";
text.toUpperCase(); // "HELLO WORLD"
text.toLowerCase(); // "hello world"
```

### Python
```python
text = "Hello World"
text.upper() # "HELLO WORLD"
text.lower() # "hello world"
```

### CSS
```css
.text-upper { text-transform: uppercase; }
.text-lower { text-transform: lowercase; }
```

---

## 2. Title Case (Capitalize Every Word)
Note: True "Title Case" often requires excluding small words (a, an, the, of), but these are the standard programmatic versions.

### JavaScript
```javascript
const titleCase = (str) => {
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};
```

### Python
```python
text = "the quick brown fox"
text.title() # "The Quick Brown Fox"
```

### CSS
```css
.text-capitalize { text-transform: capitalize; }
```

---

## 3. Slugify (URL-Friendly Strings)
Transforming "My Blog Post!" into "my-blog-post".

### JavaScript
```javascript
const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};
```

### Python
```python
import re
def slugify(text):
    text = text.lower()
    return re.sub(r'[\s_]+', '-', re.sub(r'[^\w\s-]', '', text).strip())
```

---

## 4. Remove Duplicates (List Cleaning)
Commonly used for cleaning CSVs or log files.

### JavaScript
```javascript
const uniqueLines = [...new Set(text.split('
'))].join('
');
```

### Python
```python
unique_lines = "
".join(list(dict.fromkeys(text.split("
"))))
```

---

## 📈 Don't want to write the code?
If you're dealing with sensitive data (API keys, logs, or PII) and don't want to paste it into a random cloud-based converter, use **[Uppercase](https://convertcase.fast-api.workers.dev/)**.

**Why use Uppercase for Dev tasks?**
- **100% Client-Side:** Your data never leaves your browser.
- **Zero Ads:** No distractions when you're in the flow state.
- **Offline Ready:** Use it even when you're disconnected.

---
*Found this helpful? Star our [GitHub Repo] or share it with your team.*
