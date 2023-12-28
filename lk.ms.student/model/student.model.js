const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');
const BaseUser = require('./base-user.model');
const Post = require('./post.model.js');
const JobPost = require('./job-post.model');
const Lecturer = require('./lecturer.model');

const Student = sequelize.define(
    'Student',
    {
        school: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        languages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        experience: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            references: {
                model: Post,
                key: 'id',
            },
        },
        appliedJobs: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            references: {
                model: JobPost,
                key: 'id',
            },
        },
        lecturersThatApproved: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            references: {
                model: Lecturer,
                key: 'id',
            },
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        freezeTableName: true
    },
    {
        parent: BaseUser,
        hasMany: Post,JobPost,Lecturer
    },
);

module.exports = Student;