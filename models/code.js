const {Sequelize, sequelize} = require('./connection');
const User = require('./user');

const Code = sequelize.define('code',{
    id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    fileName:{
        type:Sequelize.STRING(30),
        allowNull: false
    },

    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Code.belongsTo(User);

module.exports=Code;
