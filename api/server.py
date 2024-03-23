import os
import psycopg2
from dotenv import load_dotenv 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from passlib.hash import argon2

load_dotenv()

app = Flask(__name__)
CORS(app)

postgres_url = os.getenv("DATABASE_URL")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
connection = psycopg2.connect(postgres_url)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

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

@app.route("/api/get_users", methods=['GET'])
def get_user_table():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM \"user\";")
        users = cursor.fetchall()  # Fetch all rows of the query result

        # Convert each user record into a dictionary
    return jsonify({"status": "success", "message": "User table has been retrieved", "users": users})

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
            session['user_id'] = user_id
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
        print("HELLLLLOOOOOOOOO")
        cursor.execute("SELECT id, password FROM \"user\" WHERE username = %s", (username,))
        user = cursor.fetchone()
        session['user_id'] = user[0]
        print(session['user_id'])
        if user and argon2.verify(password, user[1]):  # Verify the password against the stored hash
            return jsonify({"status": "success", "message": "Login successful", "user_id": user[0]})
        else:
            return jsonify({"status": "error", "message": "Invalid username or password"}), 401


CREATE_COMMUNICATIONS_LOG_TABLE = """
CREATE TABLE IF NOT EXISTS communications_log (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    method VARCHAR(50) NOT NULL,
    organization_or_person VARCHAR(255) NOT NULL,
    purpose TEXT,
    notes TEXT,
    follow_up_needed BOOLEAN NOT NULL
);
"""

@app.post("/api/communications_log")
def add_communications_log_entry():
    print("test")
    print(request.headers)
    data = request.get_json()
    
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO communications_log (date_time, method, organization_or_person, purpose, notes, follow_up_needed)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (
            data['dateTime'], 
            data['method'], 
            data['organizationOrPerson'], 
            data.get('purpose', ''), 
            data.get('notes', ''),
            data['followUpNeeded']
        ))
        connection.commit()
        new_id = cursor.fetchone()[0]
    return jsonify({"status": "success", "message": "Log entry added.", "id": new_id}), 201

@app.route("/api/get_communication_log", methods=['GET'])
def get_communication_log():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM communications_log;")
        users = cursor.fetchall()  # Fetch all rows of the query result

        # Convert each user record into a dictionary
    return jsonify({"status": "success", "message": "User table has been retrieved", "users": users})

PATIENT_TABLE = """
CREATE TABLE IF NOT EXISTS patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    admin_id INTEGER,
    FOREIGN KEY (admin_id) REFERENCES \"user\"(id)
);
"""

@app.route('/api/patients', methods=['GET'])
def get_patients():
    with connection.cursor() as cursor:
        cursor.execute('SELECT patient_id, first_name, last_name, email, phone FROM patients;')
        patients = cursor.fetchall()
        cursor.close()
        patient_list = []
        for patient in patients:
            patient_dict = {
                'patient_id': patient[0],
                'first_name': patient[1],
                'last_name': patient[2],
                'email': patient[3],
                'phone': patient[4]
            }
            patient_list.append(patient_dict)
        response = jsonify(patient_list)
        # response = after_request(response)
    return response

@app.post('/api/add_patient')
def add_patient():
    data = request.get_json()
    user_id = session.get('user_id', 3)
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO patients (first_name, last_name, email, phone, admin_id)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING patient_id;
        """, (
            data['firstName'], 
            data['lastName'], 
            data['email'], 
            data.get('phone'),
            user_id
        ))
        connection.commit()
    return jsonify({"status": "success", "message": "Patient Talble has been created"})


if __name__ == "__main__":
    app.run(debug=True)
