const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', (req, res, next) => {
    try {
        const fighters = FighterService.getAll();
        res.data = fighters;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const fighter = FighterService.getOne({id: req.params.id});
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
    if (res.err) {
        return res.status(400).json({ error: true, message: res.err.message });
    }
    try {
        const {name, health, power, defense} = req.body;
        const fighter = FighterService.create({
            name,
            health: health ? health : 100,
            power,
            defense 
        });
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    if (res.err) {
        return res.status(400).json({ error: true, message: res.err.message });
    }
    try {
        const {health, power, defense} = req.body;
        const fighterData = FighterService.getOne({id: req.params.id});
        const fighter = FighterService.update({id: req.params.id}, {
            health: health ? health : fighterData.health,
            power: power ? power : fighterData.power,
            defense: defense ? defense : fighterData.defense
        });
        res.data = fighter;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const fighter = FighterService.delete({id: req.params.id});
        res.status(404).json('Fighter was deleted successfully');
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;