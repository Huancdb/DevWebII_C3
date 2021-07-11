// JavaScript source code
const pessoasModelPg = require('../models/pessoas-model-pg');

exports.adicionarPessoaPg = async (req, res) => {

    const pessoa = req.body;

    const pessoaExiste = await pessoasModelPg.findAll({
        where: {
            email: pessoa.email
        }
    });

    console.log(pessoaExiste);

    if (pessoaExiste.length > 0) {
        res.json({
            status: 'ok',
            message: "Email já cadastrado"
        });
    } else {
        const pessoaInserida = await pessoasModelPg.create({

            nome: pessoa.nome,
            cpf: pessoa.cpf,
            data_nasc: pessoa.data_nasc,
            telefone: pessoa.telefone,
            grupo: pessoa.grupo,
            endereco: pessoa.endereco,
            email: pessoa.email

        });
        res.json({
            status: 'ok',
            message: pessoaInserida
        });
    }
}

exports.listarPessoasPg = async (req, res) => {

    try {
        const pessoas = await pessoasModelPg.findAll();
        res.json({
            status: 'ok',
            message: pessoas
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possível listar as pessoas'
        });
    }
}

exports.listarPessoaPorIdPg = async (req, res) => {

    let id_pessoas = req.params.id_pessoas;

    try {
        const pessoaEspecifica = await pessoasModelPg.findByPk(id_pessoas);
        console.log(pessoaEspecifica);
        if (pessoaEspecifica) {
            res.json({
                status: 'ok',
                message: 'Cadastro encontrado',
                unidade: pessoaEspecifica
            });
        } else {
            res.json({
                status: 'erro',
                message: `Cadastro de id ${id_pessoas} não encontrado`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Não foi possível realizar a busca do cadastro de id ${id_pessoas}`
        });
    }
}

exports.atualizarPessoaPg = async (req, res) => {
    let id_pessoas = req.params.id_pessoas;

    let novaPessoa = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nasc: req.body.data_nasc,
        telefone: req.body.telefone,
        grupo: req.body.grupo,
        endereco: req.body.endereco,
        email: req.body.email
    }

    if (id_pessoas) {
        let pessoaAtualizada = await pessoasModelPg.update(novaPessoa, { where: { id: id_pessoas } });
        if (pessoaAtualizada) {
            res.json({
                status: 'ok',
                message: 'Cadastro atualizado com sucesso'
            });
        } else {
            res.json({
                status: 'erro',
                message: `Erro ao atualizar a pessoa de id ${id_pessoas}`
            });
        }
    } else {
        console.log("ID não encontrado");
    }
}

exports.removerPessoaPg = async (req, res) => {
    let id_pessoas = req.params.id_pessoas;

    if (id_pessoas) {
        try {
            let pessoaDeletada = await pessoasModelPg.destroy({ where: { id: id_pessoas } });
            if (pessoaDeletada) {
                res.json({
                    status: 'ok',
                    message: `Cadastro de id ${id_pessoas} deletada com sucesso`
                });
            } else {
                res.json({
                    status: 'erro',
                    message: `Não foi possível remover o cadastro de id ${id_pessoas}`
                });
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Erro ao tentar remover cadastro`
            });
        }
    }
}