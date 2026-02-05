CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(150) NOT NULL,
    token VARCHAR(6),
    token_expiration TIMESTAMP
);

INSERT INTO customers (cnpj, email)
VALUES ('12345678000199', 'your-email@example.com');