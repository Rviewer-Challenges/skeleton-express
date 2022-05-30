export class Pong {
    _message

    constructor() {
        this._message = 'pong'
    }

    unmarshal() {
        return {
            'message': this._message
        }

    }
}
