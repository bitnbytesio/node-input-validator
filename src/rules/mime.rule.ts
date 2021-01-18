import { ValidationRuleContract } from "../contracts";

import * as mimeTypes from 'mime-types'
import { fromBuffer } from 'file-type'
import readChunk from 'read-chunk'

export function mime(args: Array<string>, trust: boolean = false): ValidationRuleContract {
  return {
    name: "mime",
    handler: async (value: any) => {
      const file = value;

      let success = true;

      let mtype;

      if (file.mime && trust) {
        mtype = file.mime;
      } else if (file.type && trust) {
        mtype = file.type;
      } else if (file instanceof Buffer) {
        try {
          const fileType = await fromBuffer(file);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
      } else if (file.buffer && file.buffer instanceof Buffer) {
        try {
          const fileType = await fromBuffer(file.buffer);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
      } else if (typeof file === 'string') {
        try {
          const buffer = await readChunk(file, 0, 4100);
          const fileType = await fromBuffer(buffer);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
      } else if (file.path && typeof file.path === 'string') {
        try {
          const buffer = await readChunk(file.path, 0, 4100);
          const fileType = await fromBuffer(buffer);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
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
        } else {
          success = true;
          break;
        }
      }

      if (!success) {
        return false;
      }

      return true;
    },
  };
}
