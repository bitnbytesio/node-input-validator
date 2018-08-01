//@ts-ignore
const moment = require('moment');
const File = require('./file');

/**
 * date formats
 * 
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
     * 
     * @param field
     * @param value
     * @param format
     * @returns {Promise.<boolean>}
     */
    async validateDateFormat(field, value, format) {

        if (!moment(value, format, true).isValid()) {

            return false;
        }

        return true;
    }

    /**
     * validate future date
     * 
     * @param field
     * @param value
     * @param afterDate
     * @returns {Promise.<boolean>}
     */
    async validateAfter(field, value, afterDate) {


        let mAfterDate, mDate;
        /* if (typeof this.validator.validations[field].date_format !== 'undefined') {
             mAfterDate = moment(afterDate, date_formats.concat([this.validator.validations[field].date_format]));
             mDate = moment(value, this.validator.validations[field].date_format, true);
         }*/

        mAfterDate = moment(afterDate, date_formats);
        mDate = moment(value, date_formats);

        /* istanbul ignore next */
        if (!mAfterDate.isValid() || !mDate.isValid() || mAfterDate.valueOf() > mDate.valueOf()) {
            return false;
        }

        /*  if (!mDate.isValid()) {
              return false;
          } 
          
          if (mAfterDate.valueOf() > mDate.valueOf()) {
              return false;
          }*/

        return true;
    }

    /**
     * validate past date
     * 
     * @param field
     * @param value
     * @param beforeDate
     * @returns {Promise.<boolean>}
     */
    async validateBefore(field, value, beforeDate) {

        let mBeforeDate, mDate;
        /* if (typeof this.validator.validations[field].date_format !== 'undefined') {
             mBeforeDate = moment(beforeDate, date_formats.concat([this.validator.validations[field].date_format]));
             mDate = moment(value, this.validator.validations[field].date_format, true);
         }*/
        mBeforeDate = moment(beforeDate, date_formats);
        mDate = moment(value, date_formats);

        /* istanbul ignore next */
        if (!mBeforeDate.isValid() || !mDate.isValid() || mBeforeDate.valueOf() < mDate.valueOf()) {

            return false;
        }



        return true;
    }

}

module.exports = DateRules;