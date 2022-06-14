const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
    try {
        const users = UserService.getAll();
        res.data = users;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const user = UserService.search({id: req.params.id});
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    if (res.err) {
        return res.status(400).json({ error: true, message: res.err.message });
    }
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body;
        const user = UserService.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
    if (res.err) {
        return res.status(400).json({ error: true, message: res.err.message });
    }
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body;
        const userData = UserService.search({id: req.params.id});
        const user = UserService.update({id: req.params.id}, {
            firstName: firstName ? firstName : userData.firstName,
            lastName: lastName ? lastName : userData.lastName,
            email: email ? email : userData.email,
            phoneNumber: phoneNumber ? phoneNumber : userData.phoneNumber,
            password: password ? password : userData.password
        });
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const user = UserService.delete({id: req.params.id});
        res.status(404).json('User was deleted successfully');
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;