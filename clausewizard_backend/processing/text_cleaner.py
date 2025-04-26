import re

def remove_headers(text):
    text = re.sub(r'\bDIO\s+[^\n]*\n?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bPOGLAVLJE\s+[^\n]*\n?', '', text, flags=re.IGNORECASE)
    return text
