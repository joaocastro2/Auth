CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(150) NOT NULL,
    token VARCHAR(6),
    token_expiration TIMESTAMP
);