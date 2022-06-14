const { user } = require('../models/user');
const UserService = require('../services/userService');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const {id, firstName, lastName, email, phoneNumber, password} = req.body;
    try {
        if (id) {
            throw Error('This request cannot contain id value');
        }

        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            throw Error('All fields must be filled in');
        }

        if (!email.match(/^[a-z0-9]((\.|\+)?[a-z0-9]){5,}@gmail\.com/)) {
            throw Error('Email must be gmail format');
        }

        if (!phoneNumber.match(/\+380[0-9]{9}/) || phoneNumber.length !== 13) {
            throw Error('Phone number must be in +380xxxxxxxxx format');
        }

        if (password.length < 3) {
            throw Error('Password must be at least 3 characters long');
        }

        if (UserService.search({ email })) {
            throw Error('User with this email already exists');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const {id, firstName, lastName, email, phoneNumber, password} = req.body;
    try {
        if(!(firstName || lastName || email || phoneNumber || password)) {
            throw Error('Cannot update with empty fields');
        }

        if (email && !email.match(/^[a-z0-9]((\.|\+)?[a-z0-9]){5,}@gmail\.com/)) {
            throw Error('Email must be gmail format');
        }

        if (phoneNumber && (!phoneNumber.match(/\+380[0-9]{9}/) || phoneNumber.length !== 13)) {
            throw Error('Phone number must be in +380xxxxxxxxx format');
        }

    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;