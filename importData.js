const mongoose = require('mongoose');
const fs = require('fs');

const Contrato = require('./ex1/models/contrato');  // Ajuste o caminho conforme necessário

mongoose.connect('mongodb://127.0.0.1/db-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    
    // Carregar o arquivo JSON
    const data = JSON.parse(fs.readFileSync('./contratos2024.json', 'utf8'));

    // Inserir os dados na coleção
    Contrato.insertMany(data)
      .then(() => {
        console.log('Dados importados com sucesso');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Erro ao importar os dados:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
