import os
import psycopg2
from psycopg2.extensions import register_adapter, AsIs
from dotenv import load_dotenv

load_dotenv()

def adapt_list(lst):
    return AsIs(f"'[{', '.join(map(str, lst))}]'")

register_adapter(list, adapt_list)

def get_connection():
    connection_string = os.getenv('DATABASE_URL')
    conn = psycopg2.connect(connection_string)
    return conn
