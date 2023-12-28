const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');

const Post = sequelize.define(
    'Post',
    {
        _id: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        company: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
);

module.exports = Post;