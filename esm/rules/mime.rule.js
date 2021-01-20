var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mimeTypes from 'mime-types';
import { fromBuffer } from 'file-type';
import readChunk from 'read-chunk';
export function mime(args, trust = false) {
    return {
        name: "mime",
        handler: (value) => __awaiter(this, void 0, void 0, function* () {
            const file = value;
            let success = true;
            let mtype;
            if (file.mime && trust) {
                mtype = file.mime;
            }
            else if (file.type && trust) {
                mtype = file.type;
            }
            else if (file instanceof Buffer) {
                try {
                    const fileType = yield fromBuffer(file);
                    if (fileType) {
                        mtype = fileType.mime;
                    }
                }
                catch (e) {
                    /* istanbul ignore next */
                    console.error(e);
                }
            }
            else if (file.buffer && file.buffer instanceof Buffer) {
                try {
                    const fileType = yield fromBuffer(file.buffer);
                    if (fileType) {
                        mtype = fileType.mime;
                    }
                }
                catch (e) {
                    /* istanbul ignore next */
                    console.error(e);
                }
            }
            else if (typeof file === 'string') {
                try {
                    const buffer = yield readChunk(file, 0, 4100);
                    const fileType = yield fromBuffer(buffer);
                    if (fileType) {
                        mtype = fileType.mime;
                    }
                }
                catch (e) {
                    /* istanbul ignore next */
                    console.error(e);
                }
            }
            else if (file.path && typeof file.path === 'string') {
                try {
                    const buffer = yield readChunk(file.path, 0, 4100);
                    const fileType = yield fromBuffer(buffer);
                    if (fileType) {
                        mtype = fileType.mime;
                    }
                }
                catch (e) {
                    /* istanbul ignore next */
                    console.error(e);
                }
            }
            // else {
            //   throw new Error('MIME rule only accepts Buffer,file path or type/mime property in file object.');
            // }
            for (let i = 0; i < args.length; ++i) {
                if (mimeTypes.lookup(args[i]) !== mtype) {
                    success = false;
                }
                else {
                    success = true;
                    break;
                }
            }
            if (!success) {
                return false;
            }
            return true;
        }),
    };
}
//# sourceMappingURL=mime.rule.js.map