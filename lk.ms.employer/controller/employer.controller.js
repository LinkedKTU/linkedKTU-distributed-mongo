const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/api-data-success');
const ApiError = require('../scripts/responses/api-error');
const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
    sendEmail,
} = require('../service/base-service');
const Employer = require('../model/employer.model');
const { v4: uuidv4 } = require('uuid');

const getEmployers = async (req, res, next) => {
    let employers;

    try {
        employers = await getAll(Employer.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employers && employers[0].length === 0) {
        return next(
            new ApiError('There have been an error!', httpStatus.NOT_FOUND)
        );
    }
    ApiDataSuccess.send(
        'Employers fetched succesfully!',
        httpStatus.OK,
        res,
        employers[0]
    );
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer.name, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employers && employer[0].length === 0) {
        return next(
            new ApiError(
                `There are no employers with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Employer ${id} fetched!`,
        httpStatus.OK,
        res,
        employer[0]
    );
};

const createEmployer = async (req, res, next) => {
    const {
        email,
        password,
        fullname,
        description,
        image,
        phone,
        address,
        isInternshipRemote,
        isWorkRemote,
        city,
    } = req.body;

    const employerData = {
        ID: uuidv4(),
        Email: email,
        Password: password,
        Fullname: fullname,
        Description: description,
        Image: image,
        Phone: phone,
        Address: address,
        IsInternshipRemote: isInternshipRemote,
        IsWorkRemote: isWorkRemote,
        City: city,
    };

    let employer;

    try {
        employer = await create(Employer.name, employerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    sendEmail(email, fullname, password);

    ApiDataSuccess.send(
        'Employer created succesfully!',
        httpStatus.OK,
        res,
        employer[0]
    );
};

module.exports = { getEmployers, getEmployerById, createEmployer, login };
