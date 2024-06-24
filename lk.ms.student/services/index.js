const getDb = require("../loaders/index");
const mongoDb = require('mongodb');
const col = "student";

class Service {
    constructor() {
        this.db = null;
        this.initDb();
    }

    async initDb() {
        try {
            this.db = await getDb();
        } catch (error) {
            console.error('Database initialization failed:', error);
            process.exit(1);
        }
    }

    validateId(id) {
        if(!id) {
            throw Error("Must provide an id!");
        }

        try {
            return new mongoDb.ObjectId(id);
        } catch (error) {
            throw Error("Invalid id!");
        }
    }

    // Data Layer Methods Below

    async getStudents(data) {
        let queryObject = {};
        if (data && data.technology) {
            queryObject.technologies = { $in: [data.technology] };
        }

        try {
            const result = await this.db.collection(col).find(queryObject).toArray();

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getStudentByEmail(data) {
        let queryObject = {
            email: data.email
        };

        try {
            const result = await this.db.collection(col).findOne(queryObject);

            return Promise.resolve(result);            
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getStudentById(data) {
        if (!data || !data.id) {
            return Promise.reject({ message: "Id is required!" });
        }

        let objectId = this.validateId(data.id);

        try {
            const result = await this.db.collection(col).findOne({ _id: objectId });
            if (!result) {
                return Promise.reject({ message: "No student found by this id!" });
            }
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async createStudent(data) {
        if(!data || !data.email || !data.password || !data.description || !data.image || !data.name) {
            return Promise.reject({ message: "email, password, description, image, name" });
        }

        let studentData = {
            email: data.email, 
            password: data.password,
            name: data.name,
            description: data.description,
            image: data.image,
        };

        if(data.phone) {
            studentData.phone = data.phone;
        }
        if(data.address) {
            studentData.address = data.address;
        }

        try {
            const response = await this.db.collection(col).insertOne(studentData);

            if(response && response.insertedId) {
                return Promise.resolve(response.insertedId);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = new Service();
