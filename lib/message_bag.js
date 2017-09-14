const messages = require('./messages');

class MessageBag {

	constructor(validator, customMessages) {
		this.messages = Object.assign(messages, customMessages || {});
		this.validator = validator;
	}

	extend(messages) {
		this.messages = Object.assign(this.messages, messages || {});
	}

	

}

module.exports = MessageBag;