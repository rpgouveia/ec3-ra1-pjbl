CREATE DATABASE IF NOT EXISTS rpg_shelf;
USE rpg_shelf;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  `system` VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  `edition` VARCHAR(50),
  `status` ENUM('Quero', 'Tenho', 'Lendo', 'Lido') DEFAULT 'Quero',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, `system`, author, `edition`, `status`, notes) VALUES
  ('Player''s Handbook', 'D&D 5e', 'Wizards of the Coast', '5ª Edição', 'Tenho', 'Livro base essencial'),
  ('Tormenta20', 'Tormenta', 'Equipe Jambô', '1ª Edição', 'Lendo', 'Sistema nacional muito bom'),
  ('Call of Cthulhu', 'CoC', 'Chaosium', '7ª Edição', 'Quero', 'Horror cósmico clássico');