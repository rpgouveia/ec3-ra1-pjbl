DROP DATABASE IF EXISTS rpg_shelf;
CREATE DATABASE IF NOT EXISTS rpg_shelf;
USE rpg_shelf;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  `system` VARCHAR(100) NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  `edition` VARCHAR(50),
  `status` ENUM('Quero', 'Tenho', 'Lendo', 'Lido') DEFAULT 'Quero',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, `system`, publisher, author, `edition`, `status`, notes) VALUES
  ('Player''s Handbook', 'D&D 5e', 'Wizards of the Coast', 'Jeremy Crawford', '5ª Edição', 'Tenho', 'Livro base essencial'),
  ('Tormenta20', 'Tormenta', 'Jambô Editora', 'Leonel Caldela', '1ª Edição', 'Lendo', 'Sistema nacional muito bom'),
  ('Call of Cthulhu', 'CoC', 'Chaosium', 'Sandy Petersen', '7ª Edição', 'Quero', 'Horror cósmico clássico'),
  ('Pathfinder RPG', 'Pathfinder', 'Paizo', 'Logan Bonner', '2ª Edição', 'Tenho', 'Sistema de fantasia detalhado'),
  ('Shadowrun: Anarchy', 'Shadowrun', 'Catalyst Game Labs', NULL, '1ª Edição', 'Lido', 'Cyberpunk com magia'),
  ('GURPS Basic Set', 'GURPS', 'Steve Jackson Games', 'Steve Jackson', '4ª Edição', 'Quero', 'Sistema genérico e flexível'),
  ('Ordem Paranormal RPG', 'Ordem Paranormal', 'Jambô Editora', 'Cellbit', '1ª Edição', 'Tenho', 'RPG brasileiro de horror e investigação'),
  ('Blades in the Dark', 'BitD', 'Evil Hat Productions', 'John Harper', '1ª Edição', 'Quero', 'Assaltos e intrigas em cidade sombria'),
  ('Mork Borg', 'Mork Borg', 'Free League Publishing', 'Pelle Nilsson', '1ª Edição', 'Lido', 'OSR apocalíptico com visual único'),
  ('Dungeon World', 'PbtA', 'Sage Kobold Productions', 'Sage LaTorra', '1ª Edição', 'Lendo', 'Fantasia narrativa powered by the apocalypse'),
  ('Vampiro: A Máscara', 'Storyteller', 'White Wolf', 'Mark Rein-Hagen', '5ª Edição', 'Quero', 'Clássico dos RPGs de horror pessoal');