
module.exports = async function string(field, value) {
    if (typeof value !== 'string') {
        return false;
    }

    return true;
}