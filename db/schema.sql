DROP DATABASE IF EXISTS payup_db;
CREATE DATABASE payup_db;

USE `payup_db`;

CREATE TABLE `payup_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  UNIQUE INDEX `user_id_UNIQUE` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`));


CREATE TABLE `payup_db`.`products` (
  `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `product_quantity` INT NOT NULL,
  `price` INT NOT NULL,
  `in_stock` TINYINT NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE);


CREATE TABLE `payup_db`.`invoice` (
  `order_number` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NOT NULL,
  `user_address` VARCHAR(100) NOT NULL,
  `product_name` VARCHAR(100) NOT NULL,
  `product_quantity` INT NOT NULL,
  `product_price` INT NOT NULL,
  `product_in_stock` TINYINT NOT NULL,
  `client_info` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`order_number`),
  UNIQUE INDEX `order_number_UNIQUE` (`order_number` ASC) VISIBLE);


