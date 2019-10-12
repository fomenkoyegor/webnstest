import {Ajax} from "../ajax";

class UserService extends Ajax {
    constructor() {
        super('/api/users/')
    }

    async getAll(url = this.url) {
        return super.get(url);
    }

    async create(data, url = this.url,) {
        return super.post(url + '/create', data);
    }

    async delete(id) {
        return super.post(this.url + '/delete/' + id);
    }
}

const usersService = new UserService();

export {usersService}
