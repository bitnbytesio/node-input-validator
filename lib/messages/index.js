const messages = require('./en/messages');
const messagesPersian = require('./fa/messages');
const messagesBrazilian = require('./ptBR/messages');
const messagesTurkish = require('./tr/messages');

module.exports = { en: messages, fa: messagesPersian, ptBR: messagesBrazilian, tr: messagesTurkish };

module.exports.defaultLang = 'en';
