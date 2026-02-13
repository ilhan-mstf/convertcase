# generate_sitemap.py

base_url = "https://convertcase.fast-api.workers.dev"
langs = ["es", "pt", "fr", "de", "tr", "it"]
tools = [
    "remove-duplicate-lines", "remove-empty-lines", "slugify-text", "extract-emails-urls",
    "json-prettifier-minifier", "base64-encode-decode", "json-yaml-converter", "html-entity-encoder-decoder"
]

print('<?xml version="1.0" encoding="UTF-8"?>')
print('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')

# 1. Generate Homepage Entries (Root + Localized)
# The homepage structure is slightly different (root is en/x-default)
print('  <url>')
print(f'    <loc>{base_url}/</loc>')
print(f'    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/" />')
for l in langs:
    print(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{base_url}/{l}/" />')
print(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/" />')
print('    <priority>1.0</priority>')
print('  </url>')

for lang in langs:
    print('  <url>')
    print(f'    <loc>{base_url}/{lang}/</loc>')
    print(f'    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/" />')
    for l in langs:
        print(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{base_url}/{l}/" />')
    print(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/" />')
    print('    <priority>0.8</priority>')
    print('  </url>')

# 2. Generate Tool Entries
for tool in tools:
    # Root Tool (English)
    print('  <url>')
    print(f'    <loc>{base_url}/{tool}/</loc>')
    print(f'    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/{tool}/" />')
    for l in langs:
        print(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{base_url}/{l}/{tool}/" />')
    print(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/{tool}/" />')
    print('    <priority>0.7</priority>')
    print('  </url>')

    # Localized Tool Pages
    for lang in langs:
        print('  <url>')
        print(f'    <loc>{base_url}/{lang}/{tool}/</loc>')
        print(f'    <xhtml:link rel="alternate" hreflang="en" href="{base_url}/{tool}/" />')
        for l in langs:
            print(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{base_url}/{l}/{tool}/" />')
        print(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{base_url}/{tool}/" />')
        print('    <priority>0.7</priority>')
        print('  </url>')

print('</urlset>')
