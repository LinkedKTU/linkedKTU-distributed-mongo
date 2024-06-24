const axios = require("axios");
let baseUrl = process.env.GATEWAY_URL;

const connection = {
    "getStudentByEmail": async (email) => {
        try {

            // sentByAuth is for auth microservice to be able to get data without authorization
            // by {dogukanatalay1}
            let response = await axios.get(`${baseUrl}/student/email/${email}?sentByAuth=true`);

            if(response && response.data && response.data.data) {
                return Promise.resolve(response.data.data);
            }

            return Promise.resolve(null);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    "createStudent": async (data) => {
        try {
            // sentByAuth is for auth microservice to be able to get data without authorization
            // by {dogukanatalay1}
            let response = await axios.post(`${baseUrl}/student/?sentByAuth=true`, { ...data });

            if(response && response.data && response.data.data) {
                return Promise.resolve(response.data.data);
            }

            return Promise.reject({ message: "Student could not be created!" });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

module.exports = connection;

