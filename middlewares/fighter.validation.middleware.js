const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const {id, name, health, power, defense} = req.body;
    try {
        if (id) {
            throw Error('This request cannot contain id value');
        }

        if (!name || !power || !defense) {
            throw Error('Fields "name", "power" and "defense" must be filled in');
        }

        if (isNaN(Number(power))) {
            throw Error('Power must be a number');
        }

        if (power < 1 || power > 100) {
            throw Error('Power can only be from 1 to 100');
        }

        if (isNaN(Number(defense))) {
            throw Error('Defense must be a number');
        }

        if (defense < 1 || defense > 10) {
            throw Error('Defense can only be from 1 to 10');
        }

        if (health && isNaN(Number(health))) {
            throw Error('Health must be a number');
        }

        if (health && (health < 80 || health > 120)) {
            throw Error('Health can only be from 80 to 120');
        }

        if (FighterService.getOne({name})) {
            throw Error('Fighter with such name already exists')
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    const {name, health, power, defense} = req.body;
    try {
        if (!(name || health || power || defense)) {
            throw Error('Cannot update with empty fields');
        }

        if (power && isNaN(Number(power))) {
            throw Error('Power must be a number');
        }

        if (power && (power < 1 || power > 100)) {
            throw Error('Power can only be from 1 to 100');
        }

        if (defense && isNaN(Number(defense))) {
            throw Error('Defense must be a number');
        }

        if (defense && (defense < 1 || defense > 10)) {
            throw Error('Defense can only be from 1 to 10');
        }

        if (health && typeof isNaN(Number(health))) {
            throw Error('Health must be a number');
        }

        if (health && (health < 80 || health > 120)) {
            throw Error('Health can only be from 80 to 120');
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;