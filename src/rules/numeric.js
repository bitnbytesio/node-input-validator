module.exports = async function numeric(field, value) {

    return !isNaN(parseFloat(value)) && isFinite(value)
}