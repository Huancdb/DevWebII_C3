const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'postgres' });


const sincronizarPostgres = async () => {
    try {
        sequelize.sync();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sequelize, Sequelize, sincronizarPostgres };
