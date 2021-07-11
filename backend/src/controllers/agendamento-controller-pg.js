// JavaScript source code

const agendamentoModelPg = require('../models/agendamento-model-pg');

exports.adicionarAgendamentoPg = async (req, res) => {

    const agendamento = req.body;

    const agendamentoExiste = await agendamentoModelPg.findAll({
        where: {
            dt_hora: agendamento.dt_hora
        }
    });

    console.log(agendamentoExiste);

    if (agendamentoExiste.length > 0) {
        res.json({
            status: 'ok',
            message: "Agendamento para este horário existente"
        });
    } else {
        const agendamentoInserido = await agendamentoModelPg.create({
            dt_hora: agendamento.dt_hora,
            necessidades_spc: agendamento.necessidades_spc,
            obs: agendamento.obs
        });
        res.json({
            status: 'ok',
            message: agendamentoInserido
        });
    }
}

exports.listarAgendamentosPg = async (req, res) => {

    try {
        const agendamentos = await agendamentoModelPg.findAll();
        res.json({
            status: 'ok',
            message: agendamentos
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Lista de agendamentos indisponível'
        });
    }
}

exports.listarAgendamentosPorIdPg = async (req, res) => {

    let id_agendamento = req.params.id_agendamento;

    try {
        const agendamentoEspecifico = await agendamentoModelPg.findByPk(id_agendamento);
        console.log(agendamentoEspecifico);
        if (agendamentoEspecifico) {
            res.json({
                status: 'ok',
                message: 'Agendamento encontrado',
                agendamento: agendamentoEspecifico
            });
        } else {
            res.json({
                status: 'erro',
                message: `Agendamento de id ${id_agendamento} não encontrado`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Falha ao recuperar agendamento`
        });
    }
}

exports.atualizarAgendamentoPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;

    let novoAgendamento = {
        dt_hora: req.body.dt_hora,
        necessidades_spc: req.body.necessidades_spc,
        obs: req.body.obs
    }

    if (id_agendamento) {
        let agendamentoAtualizado = await agendamentoModelPg.update(novoAgendamento, { where: { id: id_agendamento } });
        if (agendamentoAtualizado) {
            res.json({
                status: 'ok',
                message: 'Agendamento atualizado com sucesso'
            });
        } else {
            res.json({
                status: 'erro',
                message: `Erro ao atualizar o agendamento de id ${id_agendamento}`
            });
        }
    } else {
        console.log("Agendamento não encontrado");
    }
}

exports.removerAgendamentoPg = async (req, res) => {
    let id_agendamento = req.params.id_agendamento;

    if (id_agendamento) {
        try {
            let agendamentoDeletado = await agendamentoModelPg.destroy({ where: { id: id_agendamento } });
            if (agendamentoDeletado) {
                res.json({
                    status: 'ok',
                    message: `Agendamento de id ${id_agendamento} deletado com sucesso`
                });
            } else {
                res.json({
                    status: 'erro',
                    message: `Não foi possível encontrar o agendemanto de id ${id_agendamento}`
                });
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Erro ao tentar remover agendamento`
            });
        }
    }
}