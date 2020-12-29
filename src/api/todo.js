import Api from "./api"

class TodoApi extends Api {
    all(callback) {
        let path = '/all'
        this.get(path, callback)
    }

    add = (data, callback) => {
        let path = '/add'
        this.post(path, data, callback)
    }

    delete = (todoId, callback) => {
        let path = '/delete/' + todoId
        this.get(path, callback)
    }

    update = (todoId, data, callback) => {
        let path = '/update/' + todoId
        this.post(path, data, callback)
    }
}

export default TodoApi