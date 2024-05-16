var express = require('express');
var router = express.Router();

const contratoController = require('../controllers/contrato');

// Listar todas as contratos
router.get('/', (req, res) => {
    contratoController.list()
    .then(dados => {
        console.log('Dados enviados:', dados);
        res.status(200).json(dados);
    })
    .catch(erro => res.status(500).send(erro));
});

// Obter contrato por ID
router.get('/:id', (req, res) => {
    contratoController.findById(req.params.id)
    .then(dado => {
        if (dado) {
            res.status(200).json(dado);
        } else {
            res.status(404).send('contrato não encontrada');
        }
    })
    .catch(erro => res.status(500).send(erro));
});

// Adicionar nova contrato
router.post('/', (req, res) => {
    contratoController.insert(req.body)
    .then(dado => res.status(201).json(dado))
    .catch(erro => res.status(500).send(erro));
});

// Deletar contrato por ID
router.delete('/:id', (req, res) => {
    contratoController.removeById(req.params.id)
    .then(resultado => {
        if (resultado.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('contrato não encontrada para deletar');
        }
    })
    .catch(erro => res.status(500).send(erro));
});

// Atualizar contrato por ID
router.put('/:id', (req, res) => {
    contratoController.update(req.params.id, req.body)
    .then(resultado => {
        if (resultado.modifiedCount > 0) {
            res.status(200).json({message: "contrato atualizada com sucesso"});
        } else {
            res.status(404).send('contrato não encontrada para atualizar');
        }
    })
    .catch(erro => res.status(500).send(erro));
});

module.exports = router;
