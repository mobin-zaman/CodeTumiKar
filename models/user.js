const {Sequelize, sequelize} = require('../models/connection');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username:{
        type: Sequelize.STRING(255),
        allowNull: false,
        unique:true
    },

    password:{
        type: Sequelize.STRING(255),
        allowNull: false
    }

});
module.exports = User;