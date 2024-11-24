/*
CREATE TABLE IF NOT EXISTS cadastros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    cep VARCHAR(9) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);
*/


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cadastro_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});

app.post('/cadastro', (req, res) => {
  const { cpf, nome, idade, cep, endereco } = req.body;
  
  if (!cpf || !nome || !idade || !cep || !endereco) {
    return res.status(400).send({ message: 'Todos os campos s\u00e3o obrigat\u00f3rios!' });
  }
  
  const query = 'INSERT INTO cadastros (cpf, nome, idade, cep, endereco) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [cpf, nome, idade, cep, endereco], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Erro ao salvar no banco de dados.' });
    }
    res.send({ 
      message: 'Cadastro realizado com sucesso!', 
      id: result.insertId, 
      cpf, nome, idade, cep, endereco 
    });
  });
});
  

app.get('/cadastros', (req, res) => {
  db.query('SELECT * FROM cadastros', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.listen(3000, () => console.log('API rodando na porta 3000!'));
