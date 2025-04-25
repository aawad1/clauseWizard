# chunk_pdf.py
import fitz
import re

# === 1. Extract text from PDF ===
def extract_text_from_pdf(path):
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return text

# === 2. Remove DIO/POGLAVLJE headers ===
def remove_headers(text):
    text = re.sub(r'\bDIO\s+[^\n]*\n?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bPOGLAVLJE\s+[^\n]*\n?', '', text, flags=re.IGNORECASE)
    return text

# === 3. Chunk by Član
def chunk_by_clan(text):
    matches = list(re.finditer(r'(Član\s+\d+\.*)', text))

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

# === 4. Save to .txt
def save_chunks_to_txt(title, chunks, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("[TITLE]\n")
        f.write(title + "\n\n")
        for idx, chunk in enumerate(chunks):
            f.write(f"[Član {idx + 1}]\n{chunk}\n\n")

# === 5. Run ===
if __name__ == "__main__":
    pdf_path = "sample_contract.pdf"
    text = extract_text_from_pdf(pdf_path)
    clean_text = remove_headers(text)
    title, chunks = chunk_by_clan(clean_text)
    save_chunks_to_txt(title, chunks, "contract_chunks.txt")

    print(f"✅ Chunked and saved {len(chunks)} Član sections and Title.")
