from .db_connect import get_connection

conn = get_connection()
cur = conn.cursor()

def get_contract_example_id_by_title(title):
    cur.execute(
        "SELECT id FROM contract_examples WHERE title = %s",
        (title,)
    )
    result = cur.fetchone()
    if result:
        return result[0]
    return None

def insert_contract_example(title, full_text, example_vector):
    existing_id = get_contract_example_id_by_title(title)
    if existing_id:
        print(f"Contract example '{title}' already exists with ID {existing_id}. Skipping insert.")
        return existing_id

    cur.execute(
        "INSERT INTO contract_examples (title, full_text, example_vector) VALUES (%s, %s, %s) RETURNING id",
        (title, full_text, list(example_vector))
    )
    example_id = cur.fetchone()[0]
    print(f"Inserted new contract example '{title}' with ID {example_id}.")

    conn.commit()  # OVDJE je ključno odmah commit!
    print(f"SQL INSERT: title={title}, len(full_text)={len(full_text)}, embedding_dim={len(example_vector)}")

    return example_id

def commit_and_close():
    conn.commit()
    cur.close()
    conn.close()
