const Sequelize = require('sequelize');

const sequelize = new Sequelize('codetumikar', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(()=>{
        console.log('CONNECTION ESTABLISHED');
    })
    .catch(err=>{
        console.log('Unable to connect to database',err);
    })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};