-- Script SQL pour créer la base et les tables (MySQL)
-- Remplacez les noms d'utilisateur / mot de passe par vos valeurs de production si nécessaire.

-- 1) Créer la base de données
CREATE DATABASE IF NOT EXISTS `recipes_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `recipes_db`;

-- 2) (Optionnel) Créer un utilisateur MySQL dédié (changez 'recipes_user' et 'strong_password')
-- Si vous préférez utiliser un user déjà existant, ignorez cette partie.
CREATE USER IF NOT EXISTS 'recipes_user' @'%' IDENTIFIED BY 'strong_password';

GRANT ALL PRIVILEGES ON `recipes_db`.* TO 'recipes_user' @'%';

FLUSH PRIVILEGES;

-- 3) Table users
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_username_unique` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 4) Table recipes
CREATE TABLE IF NOT EXISTS `recipes` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `ingredients` TEXT,
    `instructions` TEXT,
    `category` VARCHAR(100),
    `imageUrl` VARCHAR(255),
    `userId` INT UNSIGNED NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `recipes_userId_idx` (`userId`),
    CONSTRAINT `recipes_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;