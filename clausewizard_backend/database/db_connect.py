import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    connection_string = os.getenv('DATABASE_URL')
    conn = psycopg2.connect(connection_string)
    return conn
