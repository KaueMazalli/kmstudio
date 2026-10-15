#!/usr/bin/env python3
"""Dependency-free checks for the public KM Studio entry pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(str(path.relative_to(ROOT)) for path in ROOT.rglob("*.html") if ".agents" not in path.parts and ".git" not in path.parts)
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.errors = []
        self.tags = {}
        self.html_closed = False
        self.style_depth = 0

    def handle_starttag(self, tag, attrs):
        if self.html_closed:
            self.errors.append(f"Element <{tag}> appears after </html>")
        self.tags[tag] = self.tags.get(tag, 0) + 1
        values = dict(attrs)
        address = values.get("src") if tag in ("script", "img", "iframe", "source") else values.get("href") if tag in ("a", "link") else None
        if address:
            self.links.append((tag, values.get("rel", ""), address))
        if tag == "style":
            self.style_depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag == "style":
            self.style_depth -= 1

    def handle_endtag(self, tag):
        if tag == "style":
            self.style_depth -= 1
            if self.style_depth < 0:
                self.errors.append("Closing </style> without a matching opening <style>")
                self.style_depth = 0
        if tag == "html":
            self.html_closed = True

def validate(page):
    errors = []
    source = (ROOT / page).read_text(encoding="utf-8")
    parser = Inspector()
    parser.feed(source)
    parser.close()
    errors.extend(parser.errors)
    if parser.style_depth:
        errors.append("Unclosed <style> element")
    for tag in ("html", "head", "body"):
        if parser.tags.get(tag, 0) != 1:
            errors.append(f"Expected exactly one <{tag}> opening tag; found {parser.tags.get(tag, 0)}")
    for tag, rel, address in parser.links:
        url = urlsplit(address)
        if url.scheme or url.netloc or address.startswith(("#", "//")):
            continue
        if tag == "link" and rel.lower() not in ("stylesheet", "icon", "manifest", "preload", "preconnect", "canonical", "alternate"):
            continue
        if not url.path:
            continue
        target = (ROOT / unquote(url.path.lstrip("/"))) if url.path.startswith("/") else (ROOT / page).parent / unquote(url.path)
        if not target.exists():
            errors.append(f"Missing local {tag} target: {address}")
    return errors

def validate_css(path):
    errors = []
    source = path.read_text(encoding="utf-8")
    refs = re.findall(r"url\(\s*(['\"]?)(.*?)\1\s*\)", source, flags=re.IGNORECASE)
    refs.extend(re.findall(r"@import\s+(?:url\()?\s*['\"]([^'\"]+)['\"]", source, flags=re.IGNORECASE))
    for raw in refs:
        address = raw[1] if isinstance(raw, tuple) else raw
        address = address.strip()
        url = urlsplit(address)
        if not address or url.scheme or url.netloc or address.startswith(("#", "//")):
            continue
        if not url.path:
            continue
        target = (ROOT / unquote(url.path.lstrip("/"))) if url.path.startswith("/") else path.parent / unquote(url.path)
        if not target.exists():
            errors.append(f"Missing CSS asset in {path.relative_to(ROOT)}: {address}")
    return errors

def main():
    failures = 0
    for page in PAGES:
        errors = validate(page)
        for error in errors:
            print(f"ERROR {page}: {error}")
        failures += len(errors)
        if not errors:
            print(f"OK {page}")
    for css_path in sorted(path for path in ROOT.rglob("*.css") if ".agents" not in path.parts and ".git" not in path.parts):
        errors = validate_css(css_path)
        for error in errors:
            print(f"ERROR {error}")
        failures += len(errors)
        if not errors:
            print(f"OK {css_path.relative_to(ROOT)}")
    sitemap_path = ROOT / "sitemap.xml"
    try:
        sitemap = ET.parse(sitemap_path)
        urls = {element.text for element in sitemap.iter() if element.tag.endswith("}loc") or element.tag == "loc"}
    except (ET.ParseError, OSError) as error:
        print(f"ERROR sitemap.xml: {error}")
        return 1
    required = {
        "index.html": "https://kmstudios.pages.dev/",
        "modelos.html": "https://kmstudios.pages.dev/modelos.html",
        "modelos-categoria.html": "https://kmstudios.pages.dev/modelos-categoria.html",
        "projetos.html": "https://kmstudios.pages.dev/projetos.html",
    }
    for page, url in required.items():
        if url not in urls:
            print(f"ERROR sitemap.xml: Missing {url}")
            failures += 1
    print(f"{failures} issue(s) detected")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(main())
