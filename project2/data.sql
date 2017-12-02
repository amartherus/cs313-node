CREATE TABLE parent
(
	id SERIAL PRIMARY KEY NOT NULL,
	first VARCHAR(100) NOT NULL,
	last VARCHAR(100),
	email VARCHAR(100),
  phone VARCHAR(11),
  registration DATE
);

CREATE TABLE child
(
  id SERIAL PRIMARY KEY NOT NULL,
  first VARCHAR(100) NOT NULL,
  last VARCHAR(100) NOT NULL,
  parentid SERIAL references parent(id)
);
