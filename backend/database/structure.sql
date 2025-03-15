DROP DATABASE IF EXISTS balance;
CREATE DATABASE balance;
USE balance;

CREATE TABLE users(
    id INT
        PRIMARY KEY
        AUTO_INCREMENT,

    name VARCHAR(50)
        NOT NULL,
    
    surname VARCHAR(50)
        NOT NULL,

    email VARCHAR(255)
        NOT NULL
        UNIQUE,

    password VARCHAR(255)
        NOT NULL
)ENGINE=INNODB;

CREATE TABLE movements(
    id INT
        PRIMARY KEY
        AUTO_INCREMENT,

    date DATE
        NOT NULL,

    description TEXT,

    amount FLOAT(10, 2)
        NOT NULL,

    category VARCHAR(50)
        NOT NULL,

    user_id INT
        NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)ENGINE=INNODB;

-- Inserimento di un utente di test
INSERT INTO users (name, surname, email, password) VALUES
('Mario', 'Rossi', 'mario.rossi@example.com', 'hashed_password');

-- Recupero dell'ID dell'utente appena creato (supponiamo sia 1)
SET @user_id = LAST_INSERT_ID();

-- Inserimento di movimenti per marzo 2024
INSERT INTO movements (date, description, amount, category, user_id) VALUES
('2024-03-01', 'Cena al ristorante', 45.50, 'Cibo', @user_id),
('2024-03-02', 'Abbonamento Netflix', 12.99, 'Intrattenimento', @user_id),
('2024-03-02', 'Visita medica', 75.00, 'Salute', @user_id),
('2024-03-05', 'Libro di programmazione', 30.00, 'Istruzione', @user_id),
('2024-03-10', 'Abbonamento palestra', 50.00, 'Sport', @user_id),
('2024-03-12', 'Biglietto cinema', 15.00, 'Intrattenimento', @user_id),
('2024-03-15', 'Spesa settimanale', 60.00, 'Cibo', @user_id),
('2024-03-18', 'Benzina', 40.00, 'Trasporti', @user_id),
('2024-03-20', 'Cena fuori', 40.00, 'Cibo', @user_id),
('2024-03-22', 'Manutenzione auto', 120.00, 'Auto', @user_id),
('2024-03-25', 'Corso online di React', 100.00, 'Istruzione', @user_id),
('2024-03-28', 'Regalo di compleanno', 35.00, 'Regali', @user_id),
('2024-03-30', 'Bollette di casa', 200.00, 'Casa', @user_id);

-- Inserimento di un secondo utente di test
INSERT INTO users (name, surname, email, password) VALUES
('Luigi', 'Verdi', 'luigi.verdi@example.com', 'hashed_password');

-- Recupero dell'ID dell'utente appena creato (supponiamo sia 2)
SET @user_id = LAST_INSERT_ID();

-- Inserimento di movimenti per marzo 2024 per il secondo utente
INSERT INTO movements (date, description, amount, category, user_id) VALUES
('2024-03-05', 'Caffè al bar', 5.00, 'Cibo', @user_id),
('2024-03-10', 'Biglietto del treno', 10.00, 'Trasporti', @user_id);
