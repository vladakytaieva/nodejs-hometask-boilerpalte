const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    create(data) {
        let user = UserRepository.create(data);
        if (!user) {
            throw Error('Failed to create user');
        }
        return user;
    }

    update(id, data) {
        let res = UserRepository.update(id, data);
        if (!res) {
            throw Error(`Failed to update user with id ${id}`);
        }
        return res;
    }

    delete(id) {
        let res = UserRepository.delete(id);
        if (!res) {
            throw Error(`Failed to delete user with id ${id}`);
        }
        return res;
    }

    getAll() {
        let users = UserRepository.getAll();
        if (!users) {
            return null;
        }
        return users;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();