module.exports = async function arrayUniqueObjects(field, value, args) {

    if (!Array.isArray(value)) {
        return false;
    }

    args = Array.isArray(args) ? args : [args];


    const result = new Set(value.map(o => {


        let field = '';

        for (let attr of args) {

            field += o[attr];

        }

        return field;

    }));


    return result.size === value.length;

}