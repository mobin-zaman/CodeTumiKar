const {Sequelize, sequelize} = require('./connection');

const AnonymousCode = sequelize.define('anonymouscode',{
    uuid:{
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
        primaryKey: true
    },

    fileName:{
        type: Sequelize.STRING(255),
        allowNull: true
    },

    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

module.exports = AnonymousCode;
