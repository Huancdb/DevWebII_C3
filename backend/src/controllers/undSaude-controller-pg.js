// JavaScript source code
const unidadeModelPg = require('../models/undSaude-model-pg');

exports.adicionarUnidadePg = async (req, res) => {

    const unidade = req.body;

    const unidadeExiste = await unidadeModelPg.findAll({
        where: {
            nome: unidade.nome
        }
    });

    console.log(unidadeExiste);

    if (unidadeExiste.length > 0) {
        res.json({
            status: 'ok',
            message: "Já existe unidade com esse nome"
        });
    } else {
        const unidadeInserida = await unidadeModelPg.create({
            nome: unidade.nome,
            descricao: unidade.descricao,
            endereco: unidade.endereco,
            telefone: unidade.telefone,
            email: unidade.email,
            latlong: unidade.latlong
        });
        res.json({
            status: 'ok',
            message: unidadeInserida
        });
    }
}

exports.listarUnidadesPg = async (req, res) => {

    try {
        const unidades = await unidadeModelPg.findAll();
        res.json({
            status: 'ok',
            message: unidades
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Falha ao tentar listar unidades'
        });
    }
}

exports.listarUnidadesPorIdPg = async (req, res) => {

    let id_unidade = req.params.id_unidade;

    try {
        const unidadeEspecifica = await unidadeModelPg.findByPk(id_unidade);
        console.log(unidadeEspecifica);
        if (unidadeEspecifica) {
            res.json({
                status: 'ok',
                message: 'Unidade encontrada',
                unidade: unidadeEspecifica
            });
        } else {
            res.json({
                status: 'erro',
                message: `Unidade de id ${id_unidade} não cadastrada`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Falha ao tentar listar unidades`
        });
    }
}

exports.atualizarUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    let novaUnidade = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        email: req.body.email,
        latlong: req.body.latlong
    }

    if (id_unidade) {
        let unidadeAtualizada = await unidadeModelPg.update(novaUnidade, { where: { id: id_unidade } });
        if (unidadeAtualizada) {
            res.json({
                status: 'ok',
                message: 'Unidade atualizada com sucesso'
            });
        } else {
            res.json({
                status: 'erro',
                message: 'Unidade não foi encontrada'
            });
        }
    } else {
        console.log("Falha ao atualizar unidade");
    }
}

exports.removerUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    if (id_unidade) {
        try {
            let unidadeDeletada = await unidadeModelPg.destroy({ where: { id: id_unidade } });
            if (unidadeDeletada) {
                res.json({
                    status: 'ok',
                    message: `Unidade deletada com sucesso`
                });
            } else {
                res.json({
                    status: 'erro',
                    message: `Unidade não encontrada`
                });
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover a unidade de id ${id_unidade}`
            });
        }
    }
}