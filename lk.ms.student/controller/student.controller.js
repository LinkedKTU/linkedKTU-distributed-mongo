const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/api-error');
const ApiDataSuccess = require('../scripts/responses/api-data-success');
const {
    getOneByQuery,
    getAll,
    getOneById,
    getAllByQuery,
    create,
    sendEmail,
} = require('../service/base-service'); 
const Student = require('../model/student.model');
const passwordHelper = require('..scripts/helpers/password.helper');
const { v4: uuidv4 } = require('uuid');


const createStudent = async (req, res, next) => {
    const {
        email,
        password,
        fullname,
        description,
        image,
        phone,
        address,
        school,
        city,
        contactmail,
    } = req.body;

    let student;
    try {
        student = await getOneByQuery(Student.name, 'Email', email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!student[0].length === 0) {
        return next(
            new ApiError('This email already in use!', httpStatus.BAD_REQUEST)
        );
    }

    const studentPassword = (await passwordHelper.passwordToHash(password))
        .hashedPassword;

    const studentData = {
        ID: uuidv4(),
        Email: email,
        Password: studentPassword,
        Fullname: fullname,
        Description: description,
        Image: image,
        Phone: phone,
        Address: address,
        School: school,
        City: city,
        ContactMail: contactmail,
    };

    sendEmail(email, fullname, studentPassword);

    const createdStudent = await create(Student.name, studentData);

    ApiDataSuccess.send(
        'Student created succesfully!',
        httpStatus.OK,
        res,
        createdStudent
    );
};

const getStudents = async (req, res, next) => {
    let result;

    try {
        result = await getAll(Student.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!result[0].length === 0) {
        return next(
            new ApiError('There have been an error', httpStatus.BAD_REQUEST)
        );
    }

    ApiDataSuccess.send(
        'Students fetched succesfully',
        httpStatus.OK,
        res,
        result[0]
    );
};

const getStudentById = async (req, res, next) => {
    const { id } = req.params;
    let student;

    try {
        student = await getOneById(Student.name, id, next);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (student[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Student with given id found',
        httpStatus.OK,
        res,
        student[0]
    );
};

const getStudentsByTechnology = async (req, res, next) => {
    const { technology } = req.params;
    let studentsWithGivenTech;

    try {
        studentsWithGivenTech = await getAllByQuery(
            Student.name,
            'Technologies',
            technology
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (studentsWithGivenTech[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with given tech ${technology}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Students with given skill found',
        httpStatus.OK,
        res,
        studentsWithGivenTech[0]
    );
};

module.exports = {
    login,
    getStudents,
    getStudentById,
    getStudentsByTechnology,
    createStudent,
};