const moment = require('moment');

/**
 * default supported data formats
 */
const dateFormats = [
  moment.ISO_8601,
  'DD-MM-YYYY',
  'DD.MM.YYYY',
  'DD/MM/YYYY',
  'D-M-YYYY',
  'D.M.YYYY',
  'D/M/YYYY',
  'YYYY-MM-DD HH:mm:Z',
  'YYYY-MM-DD HH:mm:ZZ',
  'YYYY-MM-DD HH:mm Z',
];

module.exports = { dateFormats };
