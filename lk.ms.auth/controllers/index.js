const buildResponse = require("../scripts/response");
const connection = require("../connection/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

let connections = {
    "student": connection.getStudentByEmail,
    "lecturer": connection.getLecturerByEmail,
    "employer": connection.getEmployerByEmail
};

const controller = {
    "registerStudent": async (req, res) => {
        if(!req.body.email) {
            return buildResponse({ res, error: { message: "email is required!" } });
        }

        try {
            let student = await connection.getStudentByEmail(req.body.email, options);

            if(student) {
                return buildResponse({ res, error: { message: "Student with same email already exists!" } });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            let studentData = {
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
            };

            let createResponse = await connection.createStudent(studentData, options);

            return buildResponse({ res, data: createResponse });
        } catch (error) {
            return buildResponse({ res, error });
        }
    },
    "registerEmployer": async (req, res) => {
        
    },
    "registerLecturer": async (req, res) => {
     
    },
    "commonLogin": async (req, res) => {
        try {
            const { email, password, loginType } = req.body;
    
            if (!email || !password || !loginType) {
                return buildResponse({ res, error: { message: "Email, password, and login type are required!" } });
            }

            let record = null;
            if (connections[loginType]) {
                record = await connections[loginType](email);
            }
    
            if (!record) {
                return buildResponse({ res, error: { message: `${loginType.charAt(0).toUpperCase() + loginType.slice(1)} with this email does not exist!` } });
            }
    
            const isPasswordCorrect = await bcrypt.compare(password, record.password);
    
            if (isPasswordCorrect) {
                const accessToken = jwt.sign({ id: record.id, email: record.email, loginType }, secretKey, { expiresIn: '1h' });
                return buildResponse({ res, data: { accessToken } });
            }
    
            return buildResponse({ res, error: { message: "Password incorrect!" } });
        } catch (error) {
            console.error('Error during login:', error);
            return buildResponse({ res, error: { message: "An error occurred during login. Please try again later." } });
        }
    },
    "verifyToken": async (req, res) => {
        const token = req.body.token;

        if (!token) {
           return buildResponse({ res, error: "No token provided!" });
        }
    
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return buildResponse({ res, error: { message: "Failed to authenticate token!" } });
            }
    
            return buildResponse({ res, data: { message: "Token is valid!", decoded } });
        });
    }
};

module.exports = controller;