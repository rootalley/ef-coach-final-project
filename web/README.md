# web

These are the web server files for the executive skills coaching application.

## Usage

### Set Up SSL Certificates

Having an SSL certificate set up enables HTTPS connections. You can use an existing certificate or generate your own. Here, we generate new self-signed certificate and key files.

> [!NOTE]  
> This repository includes `self-signed.crt` and `self-signed.key` files in its `nginx/certs` directory as placeholders. These placeholder files **should be and will be** overwritten by this operation.

``` sh
# From the 'web' directory
openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout docker/nginx/ssl/self-signed.key -out docker/nginx/ssl/self-signed.crt
```

Follow the prompts to complete the key generation process.

### Set Up Environment Variables

Use your favorite text editor to edit the `.env` file to specify your desired environment variables (project name, MySQL parameters, and phpMyAdmin parameters). You can skip this step for non-production testing.

### Install Composer

Download and install [Composer](https://getcomposer.org/).

### Install PHP Dependencies

Install the required PHP dependencies.
``` sh
# From the 'web' directory
composer install
```

### Install and Launch Docker

Download and install [Docker Desktop](https://www.docker.com/).

### Start Your Docker Container

Start the container.
``` sh
# From the 'web' directory
docker compose up -d
```

### Initialize the MySQL Database

Connect to [https://phpmyadmin.localhost](https://phpmyadmin.localhost). You should see a phpMyAdmin login screen. (The username is `root` and the password is set to the value of `MYSQL_ROOT_PASSWORD` in the `.env` file, which is `mysql_root_password` by default.)

In phpMyAdmin, select the `es_coach_database` entry in the file tree. Select the `SQL` tab and enter run the following to initialize the database.

``` sql
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
```

### Verify Everything's Working

Open your web browser and connect to [https://localhost](https://localhost). You should see the platform login screen.

> [!NOTE]  
> You may see a security warning because the certificate in use is self-signed.

### Shutting Down

Stop your Docker Container.
``` sh
# From the 'web' directory
docker compose down
```
