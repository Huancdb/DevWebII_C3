const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const AgendamentoModel = postgres.define('agendamento', {

    id_agendamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dt_hora: {
        type: Sequelize.STRING,
        allowNull: false
    },
    necessidades_spc: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    obs: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = AgendamentoModel;