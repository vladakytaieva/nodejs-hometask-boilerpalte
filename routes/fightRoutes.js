const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get('/', (req, res, next) => {
    try {
        const fights = FightService.getAll();
        res.data = fights;
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware);

module.exports = router;