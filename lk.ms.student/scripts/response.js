const buildResponse = ({ res, data }) => {
    const responseObject = {
        success: false,
        message: '',
        data: null,
        status: 200
    };

    responseObject.success = true;
    responseObject.data = data;

    res.status(200).json(responseObject);
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

    res.status(200).json(responseObject);
};

const response = ({ res, data, error }) => {
    if (error) {
        buildErrorResponse({ res, error });
    } else {
        buildResponse({ res, data });
    }
};

module.exports = response;
