DROP DATABASE IF EXISTS balance;
CREATE DATABASE balance;
USE balance;

CREATE TABLE users(
    id INT
        PRIMARY KEY
        AUTO_INCREMENT,

    name VARCHAR(100)
        NOT NULL,
    
    surname VARCHAR(100)
        NOT NULL,

    email VARCHAR(255)
        NOT NULL
        UNIQUE,

    password VARCHAR(255)
        NOT NULL
)ENGINE=INNODB;

CREATE TABLE category(
    id
        INT
        PRIMARY KEY
        AUTO_INCREMENT,
    name 
        TEXT
        NOT NULL
        UNIQUE
)ENGINE=INNODB;

CREATE TABLE movements(
    id INT
        PRIMARY KEY
        AUTO_INCREMENT,

    date DATE
        NOT NULL,

    description MEDIUMTEXT,

    amount FLOAT(10, 2),

    user_id INT,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)ENGINE=INNODB;INSERT INTO users (id, email, password, name)

INSERT INTO movements (date, description, category, amount, user_id) VALUES
('2025-02-01', 'Acquisto caffè', 'Cibo', 3.50, 1),
('2025-02-02', 'Abbonamento palestra', 'Salute', 25.00, 1),
('2025-02-03', 'Ristorante con amici', 'Cibo', 45.75, 1),
('2025-02-04', 'Acquisto libro', 'Istruzione', 12.99, 1),
('2025-02-05', 'Supermercato', 'Cibo', 60.20, 1),
('2025-02-06', 'Visita medico', 'Salute', 55.00, 1),
('2025-02-07', 'Cena fuori', 'Cibo', 35.40, 1),
('2025-02-08', 'Cinema', 'Tempo libero', 15.00, 1),
('2025-02-09', 'Abbonamento streaming', 'Tempo libero', 9.99, 1),
('2025-02-10', 'Rinnovo palestra', 'Salute', 25.00, 1);
