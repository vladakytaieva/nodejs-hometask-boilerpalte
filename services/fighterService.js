const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    create(data) {
        let fighter = FighterRepository.create(data);
        if (!fighter) {
            throw Error('Failed to create fighter');
        }
        return fighter;
    }

    update(id, data) {
        let res = FighterRepository.update(id, data);
        if (!res) {
            throw Error(`Failed to update fighter with id ${id}`);
        }
        return res;
    }

    delete(id) {
        let res = FighterRepository.delete(id);
        if (!res) {
            throw Error(`Failed to delete fighter with id ${id}`);
        }
        return res;
    }

    getOne(id) {
        let fighter = FighterRepository.getOne(id);
        if (!fighter) {
            return null;
        }
        return fighter;
    }

    getAll() {
        let fighters = FighterRepository.getAll();
        if (!fighters) {
            return null;
        }
        return fighters;
    }

}

module.exports = new FighterService();