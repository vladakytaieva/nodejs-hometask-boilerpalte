const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/login', (req, res) => {
    res.json('kdjfn');
});

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        let data = AuthService.login(req.body.email);
        if (req.body.password !== data.password) {
            throw Error('wrong password');
        } 
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;