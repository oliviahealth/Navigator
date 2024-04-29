import os
import psycopg2
from dotenv import load_dotenv 
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import timedelta
from passlib.hash import argon2
from datetime import datetime
from psycopg2.extras import Json
from psycopg2 import pool
from flask.helpers import send_from_directory
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

postgres_url = os.getenv("DATABASE_URL")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
connection_pool = psycopg2.pool.SimpleConnectionPool(minconn=1, maxconn=20, dsn=postgres_url)

app.config['JWT_SECRET_KEY'] = '}NN~V6Yl%/W&U^(yp;|bMr8W})fn5O'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
jwt = JWTManager(app)

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

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/forms/<formType>/<int:patientId>", methods=['GET'])
def get_forms(formType, patientId):
    try:
        connection = connection_pool.getconn()

        with connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {formType} WHERE patient_id = %s;", (patientId,))
            logs = cursor.fetchall()

            column_names = [desc[0] for desc in cursor.description]  
            column_names[0] = 'log_id'
            column_names[1] = 'date_time'
            logs_list = [dict(zip(column_names, log)) for log in logs] 
    finally:
        connection_pool.putconn(connection)

    return jsonify(logs_list)

@app.route("/api/get_general_information/<int:patientId>", methods=['GET'])
def get_general_information(patientId):
    try:
        connection = connection_pool.getconn()

        with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM general_information WHERE patient_id = %s ORDER BY date_time DESC LIMIT 1;", (patientId,))

                logs = cursor.fetchone()
    finally:
        connection_pool.putconn(connection)    
    return jsonify(logs)



@app.route("/api/create_form_table", methods=['POST'])
def create_form_table():
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            Create_table = """
            CREATE TABLE IF NOT EXISTS care_providers (
                id SERIAL PRIMARY KEY,
                date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                data JSONB NOT NULL,
                patient_id INTEGER,
                FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
            );
            """
            cursor.execute(Create_table)
            connection.commit()
            return jsonify({"message": "Table created successfully"}), 201
    except Exception as e:
        print(f"Error creating table: {e}")
        return jsonify({"error": "Failed to create table"}), 500
    finally:
        connection_pool.putconn(connection)

@app.route("/api/insert_forms/<formType>/<int:patientId>", methods=['POST'])
def insert_form(formType, patientId):
    data = request.get_json()
    # print(data)
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            query = """
                INSERT INTO {} (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """.format(formType) 
            cursor.execute(query, (
                datetime.now(),
                Json(data),
                patientId,
            ))
            inserted_id = cursor.fetchone()[0]
            print(inserted_id)
            connection.commit()
    except Exception as e:
        print(str(e))
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        connection_pool.putconn(connection)
    
    return jsonify({"inserted_id": 0}), 201

@app.route("/api/get_read_only_data/<formType>/<int:patientId>/<logId>", methods=['GET'])
def get_read_only_data(formType, patientId, logId):
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            query = f"SELECT * FROM {formType} WHERE id = %s AND patient_id = %s;"
            cursor.execute(query, (logId, patientId))
            log = cursor.fetchone()
    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        connection_pool.putconn(connection)
    
    if log is not None:
        return jsonify(log)
    else:
        return jsonify({"error": "Log not found"}), 404

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
    try:
        connection = connection_pool.getconn()
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(CREATE_USER_TABLE)
                cursor.execute(INSERT_USER, (username, firstName, lastName, email, phone, hashed_password, is_admin, admin_id))  # Store the hashed password
                user_id = cursor.fetchone()[0]
                access_token = create_access_token(identity=user[0])
                connection.commit()
    finally:
        connection_pool.putconn(connection)
    return jsonify({
        "status": "success",
        "message": "User created successfully.",
        "access_token": access_token
    }), 201

@app.post("/api/login")
def login():
    try:
        connection = connection_pool.getconn()
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        with connection.cursor() as cursor:
            cursor.execute("SELECT id, password FROM \"user\" WHERE username = %s", (username,))
            user = cursor.fetchone()
            access_token = create_access_token(identity=user[0])
            if user and argon2.verify(password, user[1]):  
                return jsonify({"status": "success", "message": "Login successful", "access_token": access_token})
            else:
                return jsonify({"status": "error", "message": "Invalid username or password"}), 401
    except Exception as e:
        response = jsonify({'error': str(e)}), 500
    finally:
        connection_pool.putconn(connection)

@app.route('/api/patients', methods=['GET'])
@jwt_required()
def get_patients():
    connection = connection_pool.getconn()
    user_id = get_jwt_identity()
    
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT patient_id, first_name, last_name, email, phone FROM patients WHERE admin_id = %s;', (user_id,))
            patients = cursor.fetchall()
            patient_list = [{
                'patient_id': patient[0],
                'first_name': patient[1],
                'last_name': patient[2],
                'email': patient[3],
                'phone': patient[4]
            } for patient in patients]  
            response = jsonify(patient_list)
    except Exception as e:
        response = jsonify({'error': str(e)}), 500
    finally:
        connection_pool.putconn(connection)
        return response

@app.post('/api/add_patient')
@jwt_required()
def add_patient():
    try:
        connection = connection_pool.getconn()
        data = request.get_json()
        user_id = get_jwt_identity()
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
    finally:
        connection_pool.putconn(connection)
    return jsonify({"status": "success", "message": "Patient Talble has been created"})

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

@app.post("/api/communications_log/<int:patientId>")
def add_communications_log_entry(patientId):
    try:
        connection = connection_pool.getconn()
        data = request.get_json()
        with connection.cursor() as cursor:
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
                patientId,
            ))
            connection.commit()
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "Communicaition Log Added"}), 201

@app.post("/api/participant_info/<int:patientId>")
def add_participant_info(patientId):
    requestData = request.get_json()

    current_time = datetime.now()

    try:
        connection = connection_pool.getconn()

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO participant_info (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """, (
                current_time,  
                Json(requestData),  
                patientId,  
            ))
            inserted_id = cursor.fetchone()[0]  # Fetch the returned id
            connection.commit()
    finally:
        connection_pool.putconn(connection)
    return jsonify({"status": "success", "message": "Participant info added", "insertedId": inserted_id}), 201

@app.post("/api/demographics-others/<int:patientId>")
def add_demographics_others(patientId):
    try:
        connection = connection_pool.getconn()
        requestData = request.get_json()

        current_time = datetime.now()

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO demographics_others (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """, (
                current_time,  
                Json(requestData),  
                patientId,  
            ))
            inserted_id = cursor.fetchone()[0]  # Fetch the returned id
            connection.commit()
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "demographics other info added", "insertedId": inserted_id}), 201

@app.post("/api/child-demographics/<int:patientId>")
def add_child_demographics(patientId):
    try:
        connection = connection_pool.getconn()
        requestData = request.get_json()

        current_time = datetime.now()

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO child_demographics (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """, (
                current_time,  
                Json(requestData),  
                patientId,  
            ))
            inserted_id = cursor.fetchone()[0]  # Fetch the returned id
            connection.commit()
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "child demographics info added", "insertedId": inserted_id}), 201

@app.post("/api/support-systems/<int:patientId>")
def add_support_systems(patientId):
    try:
        connection = connection_pool.getconn()
        requestData = request.get_json()

        current_time = datetime.now()

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO support_systems (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """, (
                current_time,  
                Json(requestData),  
                patientId,  
            ))
            inserted_id = cursor.fetchone()[0]  # Fetch the returned id
            connection.commit()
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "support systems info added", "insertedId": inserted_id}), 201

Create_table = """
CREATE TABLE IF NOT EXISTS pregnancy (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    data JSONB NOT NULL,
    patient_id INTEGER,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);
"""

@app.post("/api/pregnancy/<int:patientId>")
def add_pregnancy(patientId):
    try:
        connection = connection_pool.getconn()
        requestData = request.get_json()

        current_time = datetime.now()

        with connection.cursor() as cursor:
            cursor.execute(Create_table)
            cursor.execute("""
                INSERT INTO pregnancy (date_time, data, patient_id)
                VALUES (%s, %s, %s)
                RETURNING id;
            """, (
                current_time,  
                Json(requestData),  
                patientId,  
            ))
            inserted_id = cursor.fetchone()[0]  # Fetch the returned id
            connection.commit()
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "pregnancy info added", "insertedId": inserted_id}), 201



@app.route("/api/get_participant_info", methods=['GET'])
def get_participant_info():
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM demographics_others;")
            participants = cursor.fetchall() 
    finally:
        connection_pool.putconn(connection)

    return jsonify({"status": "success", "message": "Participant info added", "insertedId": participants}), 201



@app.route("/api/get_communication_log/<int:patient_id>/<log_id>", methods=['GET'])
def get_communication_log(patient_id, log_id):
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            print("test")
            cursor.execute('SELECT * FROM communications_log WHERE patient_id = %s AND id = %s', (patient_id, log_id))
            logs = cursor.fetchone() 
            print(logs)
            if logs:
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
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection_pool.putconn(connection)
    
    return jsonify(log_dict)

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
@app.post("/api/appointment_log/<int:patientId>")
def add_appointment_log_entry(patientId):
    try:
        connection = connection_pool.getconn()
        data = request.get_json()

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO appointment_log (date_time, who, location, notes, patient_id)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                data['dateTime'],
                data['who'],
                data['location'],
                data['notes'],
                patientId
            ))

            connection.commit()
    finally:
        connection_pool.putconn(connection)
    
    return jsonify({"status": "success", "message": "appointment log created"}), 201

@app.route("/api/get_appointment_log/<int:patientId>/<log_id>", methods=['GET'])
def get_appointment_log(patientId, log_id):
    try:
        connection = connection_pool.getconn()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, date_time, who, location, notes
                FROM appointment_log
                WHERE patient_id = %s AND id = %s
                ORDER BY date_time DESC
                LIMIT 1;
            """, (patientId, log_id))
            entry = cursor.fetchone()
    finally:
        connection_pool.putconn(connection)
    if entry:
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

CREATE_PREGNANCY_TABLE = """
CREATE TABLE IF NOT EXISTS pregnancy_log (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    drugs_during_pregnancy BOOLEAN,
    drugs_in_past BOOLEAN,
    partner_drugs BOOLEAN,
    parents_addicted BOOLEAN,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);
"""

# @app.route("/api/pregnancy_log/<int:patientId>")
# def create_patient_log(patientId):
#     data = request.get_json()

#     with connection.cursor():
#         cursos.execute(CREATE_PREGNANCY_TABLE)
#         cursos.execute("INSERT INTO pregnancy_log (date_time, drugs_during_pregnancy, drugs_in_past, partner_drugs, parents_addicted)")

if __name__ == "__main__":
    app.run(debug=True)
