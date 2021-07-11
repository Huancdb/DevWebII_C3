const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const PessoasModel = postgres.define('pessoas', {
    id_unidade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nasc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    grupo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = PessoasModel;