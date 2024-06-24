// const express = require('express');
const dataService = require("../services/index");
const buildResponse = require("../scripts/response");

const controller = {
    "getStudents": async (req, res) => {
        try {

            let students = await dataService.getStudents();

            return buildResponse({ res, data: students });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
    "getStudentById": async (req, res) => {
        try {
            let response = await dataService.getStudentById({ id: req.params.id });

            return buildResponse({ res, data: response });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
    "getStudentByEmail": async (req, res) => {
        try {
            let response = await dataService.getStudentByEmail({ email: req.params.email });

            return buildResponse({ res, data: response });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
    "getStudentsByTechnology": async (req, res) => {
        try {
            let students = await dataService.getStudents({ technology: req.params.technology });

            return buildResponse({ res, data: students });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
    "createStudent": async (req, res) => {
        try {
            let students = await dataService.createStudent(req.body);

            return buildResponse({ res, data: students });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
};

module.exports = controller;