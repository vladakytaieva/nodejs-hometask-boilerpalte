const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights
    create(data) {
        const res = FightRepository.create(data);
        if (!res) {
            throw Error('Failed track a fight');
        }
        return res;
    }

    getAll() {
        const fights = FightRepository.getAll();
        if (!fights) {
            return null;
        }
        return fights;

    }

    getOne(id) {
        const fight = FightRepository.getOne(id);
        if (!fight) {
            return null;
        }
        return fight;
    }

}

module.exports = new FightersService();