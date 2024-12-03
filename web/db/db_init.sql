CREATE DATABASE es_coach_app;

USE esq_coach_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    timezone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    q1 INT NOT NULL,
    q2 INT NOT NULL,
    q3 INT NOT NULL,
    q4 INT NOT NULL,
    q5 INT NOT NULL,
    q6 INT NOT NULL,
    q7 INT NOT NULL,
    q8 INT NOT NULL,
    q9 INT NOT NULL,
    q10 INT NOT NULL,
    q11 INT NOT NULL,
    q12 INT NOT NULL,
    q13 INT NOT NULL,
    q14 INT NOT NULL,
    q15 INT NOT NULL,
    q16 INT NOT NULL,
    q17 INT NOT NULL,
    q18 INT NOT NULL,
    q19 INT NOT NULL,
    q20 INT NOT NULL,
    q21 INT NOT NULL,
    q22 INT NOT NULL,
    q23 INT NOT NULL,
    q24 INT NOT NULL,
    q25 INT NOT NULL,
    plan_management FLOAT GENERATED ALWAYS AS (
        (q6 + q7 + q12 + q13 + q14 + q16 + q17 + q18 + q22 + q23 + q24) / 11
    ) STORED,
    time_management FLOAT GENERATED ALWAYS AS (
        (q10 + q11 + q15 + q20) / 4
    ) STORED,
    organization FLOAT GENERATED ALWAYS AS (
        (q3 + q8 + q9) / 3
    ) STORED,
    emotional_regulation FLOAT GENERATED ALWAYS AS (
        (q4 + q5 + q21) / 3
    ) STORED,
    behavioral_regulation FLOAT GENERATED ALWAYS AS (
        (q1 + q2 + q19 + q25) / 4
    ) STORED,
    total INT GENERATED ALWAYS AS (
        q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10 + q11 + q12 + q13 + q14 + q15 + q16 + q17 + q18 + q19 + q20 + q21 + q22 + q23 + q24 + q25
    ) STORED,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create a new database user
CREATE USER 'es_coach_app_user'@'localhost' IDENTIFIED BY 'es_coach_app_password';

-- Grant all privileges on the database to the new user
GRANT ALL PRIVILEGES ON es_coach_app.* TO 'es_coach_app_user'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;
