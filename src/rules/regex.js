
module.exports = async function regex(field, value, pattren) {

    var regexp = new RegExp(pattren);

    if (!regexp.test(value)) {

        return false;
    }

    return true;
}