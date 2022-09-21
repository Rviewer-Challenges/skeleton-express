export class Pong {
    _message

    constructor() {
        this._message = 'pongggg'
    }

    unmarshal() {
        return {
            'message': this._message
        }

    }
}
