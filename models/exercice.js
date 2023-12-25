const { Sequelize, DataType } = require('sequelize');
const db = require('../util/database');



const Exercice = db.define('Exercice', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    group: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    }
});

module.exports = Exercice;