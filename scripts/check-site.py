#!/usr/bin/env python3
"""Validate core KM Studio pages without third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "modelos.html", "modelos-categoria.html", "projetos.html"]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.links = []
        self.errors = []
        self.html_closed = False

    def handle_starttag(self, tag, attrs):
        if self.html_closed:
            self.errors.append(f"Element <{tag}> appears after </html>")
        values = dict(attrs)
        if tag in ("script", "img", "link", "a") and (tag != "link" or values.get("rel") in ("stylesheet", "icon")):
            address = values.get("src") or values.get("href")
            if address:
                self.links.append(address)
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f"Unexpected closing tag </{tag}> (expected {self.stack[-1] if self.stack else 'none'})")
            if tag in self.stack:
                self.stack = self.stack[:self.stack.index(tag)]
        else:
            self.stack.pop()
        if tag == "html":
            self.html_closed = True

def validate(page):
    errors = []
    parser = Inspector()
    parser.feed((ROOT / page).read_text(encoding="utf-8"))
    errors.extend(parser.errors)
    if parser.stack:
        errors.append("Unclosed elements: " + ", ".join(parser.stack))
    for address in parser.links:
        url = urlsplit(address)
        if url.scheme or url.netloc or address.startswith(("#", "mailto:", "tel:", "data:", "//")):
            continue
        target = (ROOT / page).parent / unquote(url.path)
        if url.path and not target.exists():
            errors.append(f"Missing local asset or link: {address}")
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
    sitemap = ET.parse(ROOT / "sitemap.xml")
    urls = {element.text for element in sitemap.iter() if element.tag.endswith("}loc") or element.tag == "loc"}
    for page in PAGES:
        url = "https://kmstudios.pages.dev/" + ("" if page == "index.html" else page)
        if url not in urls:
            print(f"ERROR sitemap.xml: Missing {url}")
            failures += 1
    print(f"{failures} issue(s) detected")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(main())
