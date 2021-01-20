"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mime = void 0;
const mimeTypes = __importStar(require("mime-types"));
const file_type_1 = require("file-type");
const read_chunk_1 = __importDefault(require("read-chunk"));
function mime(args, trust = false) {
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
                    const fileType = yield file_type_1.fromBuffer(file);
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
                    const fileType = yield file_type_1.fromBuffer(file.buffer);
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
                    const buffer = yield read_chunk_1.default(file, 0, 4100);
                    const fileType = yield file_type_1.fromBuffer(buffer);
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
                    const buffer = yield read_chunk_1.default(file.path, 0, 4100);
                    const fileType = yield file_type_1.fromBuffer(buffer);
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
exports.mime = mime;
//# sourceMappingURL=mime.rule.js.map