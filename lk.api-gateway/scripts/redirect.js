const apiData = require("../acl.json");
const url = require('url');
const axios = require('axios');
const { buildResponse, buildErrorResponse } = require("./responses");

const getPathAfterMs = (reqPath) => {
    const segments = reqPath.split('/');

    if (segments[0] === '') {
        segments.shift();
    }
    segments.shift();
    const restOfThePath = segments.join('/');

    return restOfThePath;
};

const executeRequest = async ({ microserviceData, req }) => {
    let path = getPathAfterMs(req.path);

    let reqMethod = req.method.toLowerCase();
    let requestUrl = microserviceData.baseUrl + "/" + path;

    try{

        let config = {
            method: reqMethod,
            url: requestUrl,
            params: req.params,
            data: req.query
        };
        
        if(reqMethod == "put" || reqMethod == "post") {
            config.data = { ...config.data, ...req.body };
        }

        // let response = await axios[reqMethod](requestUrl);
        let response = await axios(config);
    
        return Promise.resolve({ response });
    } catch(error) {
        return Promise.reject(error);
    }
};

const getMicroserviceNameByPath = (reqPath) => {
    const path = url.parse(reqPath).pathname;
    const microserviceName = path.split('/')[1];

    return microserviceName;
};

const getMicroserviceDataByName = (msName) => {
    return apiData.microservices[msName];
};

const verifyToken = async (req, options) => {
    let token = req.headers["authorization"];
    if(!token && !options.sentByAuth) {
        return false;
    }

    let authMs = apiData.microservices["auth"];

    let config = {
        method: 'POST',
        data: req.query,
        url: authMs.baseUrl + "/verify/token",
        headers: {
            'Authorization': token
        }
    };

    try {
        let verificationResponse = await axios(config);
        console.log('verificationResponse: ', verificationResponse);
        // TODO

        return verificationResponse;
    } catch (error) {
        return false;
    }
};

const redirectRequest = async (req, res, next) => {
    let microserviceName = getMicroserviceNameByPath(req.url);

    let microserviceData = getMicroserviceDataByName(microserviceName);

    let sentByAuth = req.query.sentByAuth == "true"; 
    if(microserviceName !== "auth" && !sentByAuth) {
        let verified = await verifyToken(req, { sentByAuth });

        if(!verified) {
            return buildErrorResponse({ message: "Not authorized!" }, res);
        }
    }

    try {
        let response = await executeRequest({ microserviceData, req });
        if(!response) {
            buildErrorResponse({ message: "Could not get response!" }, res);
        }

        buildResponse(response, res);
    } catch(error) {
        buildErrorResponse(error, res);
    }

    return next();
};

module.exports = { redirectRequest };