const db = require('./connection');

db.serialize(() => {
  db.run(`INSERT INTO grupo (id, nome) VALUES (1, 'super admin')`);
  db.run(`INSERT INTO grupo (id, nome) VALUES (2, 'dono de restaurante')`);
  db.run(`INSERT INTO grupo (id, nome) VALUES (3, 'cliente')`);
  console.log('Grupos inseridos com sucesso!');
});

db.close();