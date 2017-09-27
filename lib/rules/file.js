const fs = require('fs'),
    mime = require('mime-types'),
    fileType = require('file-type'),
    readChunk = require('read-chunk');

//magic = require('mmmagic').Magic;

class File {

    /**
     *
     * @param Validator
     */
    constructor(Validator) {
        this.validator = Validator;
    }

    /**
     * fetch file size
     * @param size
     * @returns {*}
     */
    fetchByteSize(size) {
        size = size.toString().toLowerCase();
        if (size.includes('gb') || size.includes('g')) {
            return parseInt(size.replace('gb', '').replace('g', '')) * 1024 * 1024 * 1024;
        } else if (size.includes('mb') || size.includes('m')) {
            return parseInt(size.replace('mb', '').replace('m', '')) * 1024 * 1024;
        } else if (size.includes('kb') || size.includes('k')) {
            return parseInt(size.replace('kb', '').replace('k', '')) * 1024;
        } else if (size.includes('b')) {
            return parseInt(size.replace('b', ''));
        } else {
            return parseInt(size) * 1024;
        }
    }

    /**
     * validate file size
     * @param field
     * @param file
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateSize(field, file, args, message) {


        let success = true;

        let max, min, size;

        if (args && Array.isArray(args)) {

            max = this.fetchByteSize(args[0]);
            if (args.length >= 2) {
                min = this.fetchByteSize(args[1]);
            }
        } else {
            max = this.fetchByteSize(args);
        }

        if (file.size) {
            size = file.size;
        } else if (typeof file === 'string') {
            try {
                size = fs.statSync(file).size;
            } catch (e) {

            }
        } else if (file instanceof Buffer) {
            size = file.byteLength;
        } else {
            throw new Error('Size rule only accepts Buffer,file path or size property in file object.');
        }


        if (!max) {
            //this.validator.addError(field, 'size', 'Max or Min properties have not been provided');
            success = false;
        } else {
            if (max && size >= max) {
                //this.validator.addError(field, 'size', message || 'The file size exceeds the max size provided');
                success = false;
            }

            if (min && size <= min) {
                //this.validator.addError(field, 'size', message || 'The file size is lower than the min size stated');
                success = false;
            }
        }


        if (!success) {

            /*if(file.path && (await fs.exists(file.path))){
                await fs.remove(file.path);
            }*/

            return false;
        } else {
            return true;
        }
    }

    /**
     * validate file type with its mime
     * @param field
     * @param file
     * @param args
     * @param message
     * @returns {Promise.<boolean>}
     */
    async validateMime(field, file, args, message) {
        let success = true;

        let mtype;

        if (file.mime) {
            mtype = file.mime;
        } else if (file.type) {
            mtype = file.type;
        } else if (file instanceof Buffer) {

            try {
                mtype = fileType(file).mime
            } catch (e) {

            }

        } else if (typeof file === 'string') {
            try {
                const buffer = readChunk.sync(file, 0, 4100);
                mtype = fileType(buffer).mime;
            } catch (e) {

            }
        } else {
            throw new Error('MIME rule only accepts Buffer,file path or type/mime property in file object.');
        }

        if (Array.isArray(args)) {
            for (var i = 0; i < args.length; ++i) {
                if (mime.lookup(args[i]) !== mtype) {
                    success = false;
                } else {
                    success = true;
                    break;
                }
            }
        } else {
            if (mime.lookup(args) !== mtype) {
                success = false;
            }
        }

        if (!success) {
            //this.validator.addError(field, 'mime', message || 'The mime type mentioned does not match with the file type');

            /*if(file.path && (await fs.exists(file.path))){
                await fs.remove(file.path);
            }*/

            return false;
        } else {
            return true;
        }
    }

}

module.exports = File;
