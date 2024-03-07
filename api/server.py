import os
import psycopg2
from dotenv import load_dotenv 
from flask import Flask, request, jsonify
from flask_cors import CORS
from passlib.hash import argon2

load_dotenv()

app = Flask(__name__)
CORS(app)

postgres_url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(postgres_url)

CREATE_USER_TABLE = """
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(30) UNIQUE, 
    firstName VARCHAR(20), 
    lastName VARCHAR(20), 
    email VARCHAR(50), 
    phone VARCHAR(20), 
    password VARCHAR(255), 
    is_admin BOOLEAN, 
    admin_id INTEGER, 
    FOREIGN KEY (admin_id) REFERENCES "user"(id) ON DELETE CASCADE
);
"""


INSERT_USER = """
INSERT INTO "user" (username, firstName, lastName, email, phone, password, is_admin, admin_id)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
RETURNING id;
"""

#######
### ! IMPORTANT ! FOR TESTING PURPOSES ONLY, DELETE BEFORE PROD
@app.route("/api/clear_users", methods=['POST'])
def clear_users():
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM \"user\";")
        connection.commit()
    return jsonify({"status": "success", "message": "All users have been deleted."})

@app.route("/api/drop_table", methods=['POST'])
def drop_user_table():
    with connection.cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS \"user\";")
        connection.commit()
    return jsonify({"status": "success", "message": "User table has been dropped."})
### ! IMPORTANT ! FOR TESTING PURPOSES ONLY, DELETE BEFORE PROD
######

@app.post("/api/signup")
def signup():
    data = request.get_json()
    firstName = data["firstName"]
    lastName = data["lastName"]
    email = data["email"]
    phone = data["phone"]
    username = data["username"]
    password = data["password"]
    confirmPassword = data["confirmPassword"]
    is_admin = False
    admin_id = None

    if password != confirmPassword:
        return jsonify({"status": "error", "message": "Passwords do not match."}), 400

    hashed_password = argon2.hash(password)  # Hash the password

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USER_TABLE)
            cursor.execute(INSERT_USER, (username, firstName, lastName, email, phone, hashed_password, is_admin, admin_id))  # Store the hashed password
            user_id = cursor.fetchone()[0]
            connection.commit()
    return jsonify({
        "status": "success",
        "message": "User created successfully.",
        "user_id": user_id
    }), 201

@app.post("/api/login")
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    with connection.cursor() as cursor:
        cursor.execute("SELECT id, password FROM \"user\" WHERE username = %s", (username,))
        user = cursor.fetchone()
        if user and argon2.verify(password, user[1]):  # Verify the password against the stored hash
            return jsonify({"status": "success", "message": "Login successful", "user_id": user[0]})
        else:
            return jsonify({"status": "error", "message": "Invalid username or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
