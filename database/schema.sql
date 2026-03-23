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

INSERT INTO books (title, `system`, publisher, author, `edition`, `status`, notes, created_at) VALUES
  ('Player''s Handbook', 'D&D 5e', 'Wizards of the Coast', 'Jeremy Crawford', '5ª Edição', 'Tenho', 'Livro base essencial', '2025-01-10 14:30:00'),
  ('Tormenta20', 'Tormenta', 'Jambô Editora', 'Leonel Caldela', '1ª Edição', 'Lendo', 'Sistema nacional muito bom', '2025-02-05 09:15:00'),
  ('Call of Cthulhu', 'CoC', 'Chaosium', 'Sandy Petersen', '7ª Edição', 'Quero', 'Horror cósmico clássico', '2025-03-12 18:45:00'),
  ('Pathfinder RPG', 'Pathfinder', 'Paizo', 'Logan Bonner', '2ª Edição', 'Tenho', 'Sistema de fantasia detalhado', '2025-04-20 11:00:00'),
  ('Shadowrun: Anarchy', 'Shadowrun', 'Catalyst Game Labs', NULL, '1ª Edição', 'Lido', 'Cyberpunk com magia', '2025-06-08 16:20:00'),
  ('GURPS Basic Set', 'GURPS', 'Steve Jackson Games', 'Steve Jackson', '4ª Edição', 'Quero', 'Sistema genérico e flexível', '2025-07-15 10:30:00'),
  ('Ordem Paranormal RPG', 'Ordem Paranormal', 'Jambô Editora', 'Cellbit', '1ª Edição', 'Tenho', 'RPG brasileiro de horror e investigação', '2025-09-01 20:00:00'),
  ('Blades in the Dark', 'BitD', 'Evil Hat Productions', 'John Harper', '1ª Edição', 'Quero', 'Assaltos e intrigas em cidade sombria', '2025-10-18 13:45:00'),
  ('Mork Borg', 'Mork Borg', 'Free League Publishing', 'Pelle Nilsson', '1ª Edição', 'Lido', 'OSR apocalíptico com visual único', '2025-12-03 08:00:00'),
  ('Dungeon World', 'PbtA', 'Sage Kobold Productions', 'Sage LaTorra', '1ª Edição', 'Lendo', 'Fantasia narrativa powered by the apocalypse', '2026-01-22 15:30:00'),
  ('Vampiro: A Máscara', 'Storyteller', 'White Wolf', 'Mark Rein-Hagen', '5ª Edição', 'Quero', 'Clássico dos RPGs de horror pessoal', '2026-03-10 19:00:00');