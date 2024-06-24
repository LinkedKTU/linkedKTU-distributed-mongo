const buildResponse = ({ res, data }) => {
    const responseObject = {
        success: false,
        message: '',
        data: null,
        status: 200
    };

    responseObject.success = true;
    responseObject.data = data;

    return res.status(200).json(responseObject);
};

const buildErrorResponse = ({ res, error, status }) => {
    const responseObject = {
        success: false,
        message: '',
        data: null,
        status: 200
    };

    responseObject.success = false;
    responseObject.message = error.message;
    responseObject.data = null;

    // todo
    responseObject.status = status;

    return res.status(200).json(responseObject);
};

const response = ({ res, data, error }) => {
    if (error) {
        return buildErrorResponse({ res, error });
    } else {
        return buildResponse({ res, data });
    }
};

module.exports = response;
