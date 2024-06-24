const buildResponse = (responseFromMS, res) => {

    let data = null;
    let message = "Success!";

    if(responseFromMS && responseFromMS.response && responseFromMS.response.data && responseFromMS.response.data.data) {
        data = responseFromMS.response.data.data;
    }
    if(responseFromMS && responseFromMS.response && responseFromMS.response.data && responseFromMS.response.data.message) {
        message = responseFromMS.response.data.message;
    }

    res.status(200)
        .json({
            message: message || "Success",
            data: data
        });
};

const buildErrorResponse = (error, res) => {
    res.status(200)
        .json({
            message: error.message
        }); 
};

module.exports = {
    buildResponse,
    buildErrorResponse
};