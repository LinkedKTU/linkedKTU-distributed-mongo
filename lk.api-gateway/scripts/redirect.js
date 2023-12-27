const apiData = require("../acl.json");

// TODO Update Regex
function extractPathSegment(path) {
    if(!path) {
        return null;
    }

    // to secure regex by making sure last character of path is "/"
    if(path.charAt(path.length - 1) !== "/") {
        path = path + "/";
    }
    
    const regex = /\/api\/([^\/]+)\/([^\/]+)\//;
    const match = path.match(regex);
    
    console.log('match: ', match);
    if(!match) {
        return "/";
    }
    return "/" + match[2];
};

const executeRequest = async ({ requestUrl, req, res, next }) => {

    // TODO fetch
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
};

const redirectRequest = async (req, res, next) => {
    let { path, method } = req;

    let requestedMicroservice = path.split("/")[2];

    let apisByMethod = apiData.microservices[requestedMicroservice]["apis"][method];

    let processedPath = extractPathSegment(path);
    if(processedPath === null) {
        // TODO return error
        console.log("API does not exist!");
        return next();
    };
    console.log("processedPath: ", processedPath);
    
    let pathFound = apisByMethod[processedPath];
    if(pathFound && pathFound.label) {

        let baseUrl = apiData.microservices[requestedMicroservice].baseUrl;
        let requestUrl = baseUrl + processedPath;

        let response = await executeRequest({
            requestUrl,
            req,
            res,
            next
        });

        console.log(response);
    }

    return next();
};

module.exports = { redirectRequest };