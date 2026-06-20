import io
import re
import sys

# Ensure stdout uses utf-8
sys.stdout.reconfigure(encoding='utf-8')

with io.open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

emojis = set()
for char in text:
    if ord(char) > 0x2000 and char not in ['\n', '\r', '\t', ' ', '—', '’', '”', '“', '‘', '”', '“', '–']:
        emojis.add(char)

print(repr(''.join(emojis)))
