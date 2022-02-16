INSERT INTO departments
(name)
VALUES
('Software'),
('Design'),
('Marketing'),
('Human Resources'),
('Product Managment'),
('Communitcations');

INSERT INTO roles 
(title, salary, department_id)
VALUES
('Software, 100000, 1'),
('Design, 50000, 2'),
('Marketing, 55000, 3'),
('Human Resources, 45000, 4'),
('Product Managment, 69000, 5'),
('Communitcations, 45000, 6');

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 3, NULL),
  ('Virginia', 'Woolf', 2, NULL),
  ('Piers', 'Gaveston', 4, NULL),
  ('Charles', 'Nyabeze', 1, 1),
  ('Katherine', 'Mansfield', 2, NULL),
  ('Dora', 'Carrington', 2, NULL),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 4, NULL),
  ('Octavia', 'Butler', 4, NULL),
  ('Unica', 'Zurn', 5, 1);