const moment = require('moment');
const File = require('./file');

/**
 * date formats
 * @type {[null,string,string,string,string,string,string,string,string,string]}
 */
const date_formats = [
    moment.ISO_8601,
    'DD-MM-YYYY',
    'DD.MM.YYYY',
    'DD/MM/YYYY',
    'D-M-YYYY',
    'D.M.YYYY',
    'D/M/YYYY',
    'YYYY-MM-DD HH:mm:Z',
    'YYYY-MM-DD HH:mm:ZZ',
    'YYYY-MM-DD HH:mm Z'
];

class DateRules extends File {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {
        super(Validator);
        this.validator = Validator;
    }

    /**
     * validate date format
     * @param field
     * @param value
     * @param format
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateDateFormat(field, value, format, message) {


        if (!moment(value, format, true).isValid()) {

            //this.validator.addError(field, 'dateFormat', message || 'The value provided for the field is either invalid or not in the format mentioned');
            return false;
        }

        // this.validator.validations[field].date_format = format;
        return true;
    }

    /**
     * validate future date
     * @param field
     * @param value
     * @param afterDate
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateAfter(field, value, afterDate, message) {
        let mAfterDate, mDate;
        if (typeof this.validator.validations[field].date_format !== 'undefined') {
            mAfterDate = moment(afterDate, date_formats.concat([this.validator.validations[field].date_format]));
            mDate = moment(value, this.validator.validations[field].date_format, true);
        } else {
            mAfterDate = moment(afterDate, date_formats);
            mDate = moment(value, date_formats);
        }

        if (message) {
            message = message.replace(':afterDate', afterDate);
        }

        if (!mAfterDate.isValid()) {
            //this.validator.addError(field, 'after', 'The after date arguement is an invalid date');
            return false;
        } else if (!mDate.isValid()) {
            //this.validator.addError(field, 'after', 'The value of the field is an invalid date');
            return false;
        } else if (mAfterDate.valueOf() > mDate.valueOf()) {
            //this.validator.addError(field, 'after', message || 'The provided date does not fall after the date mentioned in the arguement');
            return false;
        }

        return true;
    }

    /**
     * validate past date
     * @param field
     * @param value
     * @param beforeDate
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateBefore(field, value, beforeDate, message) {


        let mBeforeDate, mDate;
        if (typeof this.validator.validations[field].date_format !== 'undefined') {
            mBeforeDate = moment(beforeDate, date_formats.concat([this.validator.validations[field].date_format]));
            mDate = moment(value, this.validator.validations[field].date_format, true);
        } else {
            mBeforeDate = moment(beforeDate, date_formats);
            mDate = moment(value, date_formats);
        }

        if (message) {
            message = message.replace(':beforeDate', beforeDate);
        }

        if (!mBeforeDate.isValid()) {
            //this.validator.addError(field, 'before', message || 'The before date arguement is an invalid date');
            return false;
        } else if (!mDate.isValid()) {
            //this.validator.addError(field, 'before', message || 'The value of the field is an invalid date');
            return false;
        } else if (mBeforeDate.valueOf() < mDate.valueOf()) {

            return false;
        }

        return true;
    }

}

module.exports = DateRules;