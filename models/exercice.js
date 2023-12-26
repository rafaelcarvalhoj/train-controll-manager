const Sequelize = require('sequelize');
const db = require('../util/database')

const Exercice = db.define('Exercice', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    group: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isIn: {
                args: [
                    [
                        'costas',
                        'superior',
                        'inferior',
                        'abdomen',
                        'peito',
                        'biceps',
                        'triceps',
                        'ombro',
                        'perna',
                        'alongamento',
                        'outros'
                    ]
                ],
                msg: "O valor do campo 'grupo muscular' não é válido."
            }
        }
    },
    link: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    }
});

module.exports = Exercice;