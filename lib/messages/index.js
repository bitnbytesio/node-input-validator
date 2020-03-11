const messages = require('./en/messages');
const messagesPersian = require('./fa/messages');
const messagesBrazilian = require('./ptBR/messages');

module.exports = { en: messages, fa: messagesPersian, ptBR: messagesBrazilian };

module.exports.defaultLang = 'en';
