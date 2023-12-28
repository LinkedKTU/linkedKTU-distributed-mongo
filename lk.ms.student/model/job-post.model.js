const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');
const Student = require('./student.model');
const Post = require('./post.model');

const JobPost = sequelize.define(
    'JobPost',
    {
        isRemote: {
            type: DataTypes.BOOLEAN,
        },
        salary: {
            type: DataTypes.STRING,
        },
        isAccepted: {
            type: DataTypes.BOOLEAN,
        },
        applicants: {
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
        parent: Post,
    },
);

module.exports = JobPost;