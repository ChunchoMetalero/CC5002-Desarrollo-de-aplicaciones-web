-- Crear Base de datos
CREATE DATABASE IF NOT EXISTS confesiones DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear usuario
CREATE USER 'dbadmin'@'localhost' IDENTIFIED BY 'dbadmin';

-- Darle permisos al usuario
GRANT ALL ON confesiones.* TO dbadmin@localhost;

