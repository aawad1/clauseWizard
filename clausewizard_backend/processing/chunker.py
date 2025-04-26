import re

def chunk_by_clan(text):
    matches = list(re.finditer(r'([ČC]lan(ak)?\s+\d+.?)', text))
    chunks = []
    title = ""

    if matches:
        title = text[:matches[0].start()].strip()

        for idx, match in enumerate(matches):
            start = match.start()
            end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)

            chunk_text = text[start:end].strip()
            if chunk_text:
                chunks.append(chunk_text)
    else:
        title = text.strip()

    return title, chunks
