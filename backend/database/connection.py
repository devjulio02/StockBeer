import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

load_dotenv()


def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        cursor_factory=RealDictCursor
    )


def test_connection():
    conn = get_connection()

    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT 1 AS status;")
            return cursor.fetchone()
    finally:
        conn.close()