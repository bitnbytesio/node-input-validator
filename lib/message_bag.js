const messages = require('./messages');

class MessageBag {

    /**
     *
     * @param Validator
     * @param customMessages
     */
    constructor(Validator, customMessages) {
        this.messages = Object.assign(messages, customMessages || {});
        this.validator = Validator;
    }

    /**
     * add messages
     * @param messages
     */
    extend(messages) {
        this.messages = Object.assign(this.messages, messages || {});
    }


}

module.exports = MessageBag;