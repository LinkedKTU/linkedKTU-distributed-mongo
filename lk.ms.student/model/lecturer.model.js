const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');
const BaseUser = require('./base-user.model');
const Student = require('./student.model');

const Lecturer = sequelize.define(
    'Lecturer',
    {
        approvedStudents: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            references: {
                model: Student,
                key: 'id',
            },
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
    {
        hasMany: Student,
        parent: BaseUser,
    },
);

module.exports = Lecturer;