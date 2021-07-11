let router = require('express').Router();

const unidadesController = require('../controllers/undSaude-controller-pg');

router.post('/', unidadesController.adicionarUnidadePg);

router.get('/', unidadesController.listarUnidadesPg);

router.get('/:id', unidadesController.listarUnidadesPorIdPg);

router.put('/:id', unidadesController.atualizarUnidadePg);

router.delete('/:id', unidadesController.removerUnidadePg);

module.exports = router;