module.exports = async function boolean(field, value, args) {
    if (!args) {
        // eslint-disable-next-line no-param-reassign
        args = [true, false, 'true', 'false', 0, 1, '0', '1'];
    }

    if (args.indexOf(value) >= 0) {
        return true;
    }

    return false;
};
