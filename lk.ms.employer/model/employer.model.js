const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');
const JobPost = require('./job-post.model');
const BaseUser = require('./base-user.model');

const Employer = sequelize.define(
    'Employer',
    {
        city: {
            type: DataTypes.STRING,
        },
        isInternshipRemote: {
            type: DataTypes.BOOLEAN,
        },
        isWorkRemote: {
            type: DataTypes.BOOLEAN,
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        languages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        jobPosts: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            references: {
                model: JobPost,
                key: 'id',
            },
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
    {
        hasMany: JobPost,
        parent: BaseUser,
    },
);

module.exports = Employer;
