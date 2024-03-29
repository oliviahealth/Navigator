import os
import psycopg2
from dotenv import load_dotenv 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
from passlib.hash import argon2

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

postgres_url = os.getenv("DATABASE_URL")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
connection = psycopg2.connect(postgres_url)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

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
        session.modified = True
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

Alter_Patients_table = """
ALTER TABLE communications_log
ADD COLUMN patient_id INTEGER,
ADD CONSTRAINT fk_patient
    FOREIGN KEY (patient_id)
    REFERENCES patients(patient_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
"""

@app.post("/api/communications_log")
def add_communications_log_entry():
    if 'selected_patient_id' not in session:
        return jsonify({'error': 'No patient selected'}), 400

    data = request.get_json()
    patient_id = session['selected_patient_id']
    
    with connection.cursor() as cursor:
        # Check if a log entry exists for the selected patient
        cursor.execute("""
            SELECT id FROM communications_log WHERE patient_id = %s LIMIT 1;
        """, (session['selected_patient_id'],))
        existing_log = cursor.fetchone()

        if existing_log:
            # An entry exists, so we update it
            cursor.execute("""
                UPDATE communications_log
                SET date_time = %s, method = %s, organization_or_person = %s, 
                    purpose = %s, notes = %s, follow_up_needed = %s
                WHERE id = %s;
            """, (
                data['dateTime'],
                data['method'],
                data['organizationOrPerson'],
                data.get('purpose', ''),
                data.get('notes', ''),
                data['followUpNeeded'],
                existing_log[0],  # ID of the existing log entry
            ))
            updated_id = existing_log[0]  # Use the existing log entry's ID
        else:
            # No entry exists, so we insert a new one
            cursor.execute("""
                INSERT INTO communications_log (date_time, method, organization_or_person, purpose, notes, follow_up_needed, patient_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                data['dateTime'],
                data['method'],
                data['organizationOrPerson'],
                data.get('purpose', ''),
                data.get('notes', ''),
                data['followUpNeeded'],
                patient_id,
            ))
            new_id = cursor.fetchone()[0]
            updated_id = new_id  # Use the new entry's ID

        connection.commit()

    action = "updated" if existing_log else "added"
    return jsonify({"status": "success", "message": f"Log entry {action}.", "id": updated_id}), 201

@app.route("/api/get_communication_log", methods=['GET'])
def get_communication_log():
    if 'selected_patient_id' not in session:
        return jsonify({'error': 'No patient selected'}), 400

    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM communications_log WHERE patient_id = %s', (session['selected_patient_id'],))
            logs = cursor.fetchone() 
            cursor.close()

            log_dict = {
                'log_id': logs[0],
                'date_time': logs[1],
                'method': logs[2],
                'organization_or_person': logs[3],
                'purpose': logs[4],
                'notes': logs[5],
                'follow_up_needed': logs[6],
                'patient_id': logs[7]
            }
            
            return jsonify(log_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'error': str(e)}), 500

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
    user_id = session.get('user_id')
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

@app.route('/api/select_patient', methods=['POST'])
def select_patient():
    data = request.get_json()
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    phone = data.get('phone')
    
    # Query the database for the patient
    with connection.cursor() as cursor:
        cursor.execute("""SELECT patient_id FROM patients 
                          WHERE first_name = %s AND last_name = %s AND email = %s AND phone = %s""",
                       (firstName, lastName, email, phone))
        result = cursor.fetchone()
        
    if result:
        patient_id = result[0]
        session['selected_patient_id'] = patient_id
        return jsonify({"status": "success", "message": "Patient selected successfully.", "patientId": patient_id}), 200
    else:
        return jsonify({"status": "error", "message": "Patient not found."}), 404

CREATE_APPOINTMENT_LOG_TABLE = """
CREATE TABLE IF NOT EXISTS appointment_log (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    who VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    notes TEXT,
    patient_id INTEGER,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);
"""
@app.post("/api/appointment_log")
def add_appointment_log_entry():
    if 'selected_patient_id' not in session:
        return jsonify({'error': 'No patient selected'}), 400
    
    data = request.get_json()
    patient_id = session['selected_patient_id']

    with connection.cursor() as cursor:
        # Check for existing entry
        cursor.execute("""
            SELECT id FROM appointment_log
            WHERE patient_id = %s
            LIMIT 1;
        """, (patient_id,))
        existing_entry = cursor.fetchone()
        
        if existing_entry:
            # An entry exists, update it
            cursor.execute("""
                UPDATE appointment_log
                SET date_time = %s, who = %s, location = %s, notes = %s
                WHERE patient_id = %s;
            """, (
                data['dateTime'],
                data['who'],
                data['location'],
                data['notes'],
                patient_id
            ))
            updated_id = existing_entry[0]  # Use the existing log entry's ID for reference
        else:
            # No entry exists, insert new
            cursor.execute("""
                INSERT INTO appointment_log (date_time, who, location, notes, patient_id)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                data['dateTime'],
                data['who'],
                data['location'],
                data['notes'],
                patient_id
            ))
            new_id = cursor.fetchone()[0]
            updated_id = new_id  # Use the new entry's ID

        connection.commit()
    
    action = "updated" if existing_entry else "added"
    return jsonify({"status": "success", "message": f"Appointment log entry {action}.", "id": updated_id}), 201

@app.route("/api/get_appointment_log", methods=['GET'])
def get_appointment_log():
    if 'selected_patient_id' not in session:
        return jsonify({'error': 'No patient selected'}), 400

    patient_id = session['selected_patient_id']
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT id, date_time, who, location, notes
            FROM appointment_log
            WHERE patient_id = %s
            ORDER BY date_time DESC
            LIMIT 1;
        """, (patient_id,))
        entry = cursor.fetchone()

        if entry:
            # Constructing a response dictionary using the fetched log entry
            response = {
                "id": entry[0],
                "dateTime": entry[1].strftime("%Y-%m-%d %H:%M:%S") if entry[1] else "",
                "who": entry[2],
                "location": entry[3],
                "notes": entry[4]
            }
            return jsonify(response)
        else:
            # No entry found for the selected patient
            return jsonify({}), 204  # No content

if __name__ == "__main__":
    app.run(debug=True)
