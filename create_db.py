import pymysql
import os

# XAMPP Default Credentials
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "" # Default XAMPP password is empty
DB_NAME = "events_db"

def create_database_and_tables():
    connection = None
    try:
        # Connect to MySQL Server (without selecting a DB first)
        connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = connection.cursor()

        # Drop Database if exists to ensure a clean slate
        cursor.execute(f"DROP DATABASE IF EXISTS {DB_NAME}")
        print(f"Dropped existing database '{DB_NAME}' if it existed.")

        # Create Database
        cursor.execute(f"CREATE DATABASE {DB_NAME}")
        print(f"Database '{DB_NAME}' created successfully.")
        
        # Select the database
        cursor.execute(f"USE {DB_NAME}")
        
        # Read the database_schema.sql file
        schema_path = os.path.join(os.path.dirname(__file__), "database_schema.sql")
        if os.path.exists(schema_path):
            with open(schema_path, 'r', encoding='utf-8') as f:
                sql_script = f.read()

            # Execute the script statement by statement
            statements = sql_script.split(';')
            print("Creating tables from database_schema.sql...")
            for statement in statements:
                stmt_stripped = statement.strip()
                if stmt_stripped:
                    try:
                        cursor.execute(stmt_stripped)
                    except Exception as inner_e:
                        print(f"Error executing statement: {stmt_stripped[:50]}... \n -> {inner_e}")
                        raise
            
            # Now verify if the tables are created
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print(f"Tables in database: {[t[0] for t in tables]}")
            print("Database tables created successfully!")
        else:
            print("Error: database_schema.sql not found.")

        connection.commit()
        
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure XAMPP (MySQL) is running and credentials are correct.")
    finally:
        if connection:
            connection.close()

if __name__ == "__main__":
    create_database_and_tables()
