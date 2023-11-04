-- Active: 1694731838085@@127.0.0.1@5432@pdv
CREATE DATABASE pdv;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  describe TEXT NOT NULL,
  price BIGINT NOT NULL,
  product_img TEXT
);
CREATE TABLE ordered (
  id SERIAL PRIMARY KEY,
  order_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_amount BIGINT NOT NULL
);
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  ordered_id INT REFERENCES ordered(id),
  product_id INT REFERENCES products(id),
  quantity INTEGER NOT NULL
);