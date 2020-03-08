/* eslint-disable eqeqeq */

// @ts-ignore
module.exports = async function same(field, value, otherField) {
    // eslint-disable-next-line no-param-reassign
    otherField = otherField.split('.').filter((e) => e !== '');

    let otherValue;

    otherField.map((item) => {
        if (typeof otherValue === 'undefined') {
            // @ts-ignore
            otherValue = this.inputs && this.inputs[item];
        } else {
            otherValue = otherValue[item];
        }
        return true;
    });

    if (typeof otherValue === 'undefined') {
        return false;
    }

    if (otherValue != value) {
        return false;
    }

    return true;
};
