import { ValidationRuleContract } from "../contracts";

import * as mimeTypes from 'mime-types'
import { fromBuffer } from 'file-type'
// const { fromBuffer } = fileType
import readChunk from 'read-chunk'

export function mime(args: Array<string>, trust: boolean = false): ValidationRuleContract {
  return {
    name: "mime",
    handler: async (value: any) => {
      let mtype;

      if (trust) {
        mtype = value.mime || value.type;
      } else if (value instanceof Buffer) {
        try {
          const fileType = await fromBuffer(value);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
      }
      // should uncomment if found any practile use
      // else if (value.buffer && value.buffer instanceof Buffer) {
      //   try {
      //     const fileType = await fromBuffer(value.buffer);
      //     if (fileType) {
      //       mtype = fileType.mime;
      //     }
      //   } catch (e) {
      //     /* istanbul ignore next */
      //     console.error(e);
      //   }
      // } 
      else if (typeof value === 'string') {
        try {
          const buffer = await readChunk(value, 0, 4100);
          const fileType = await fromBuffer(buffer);
          if (fileType) {
            mtype = fileType.mime;
          }
        } catch (e) {
          /* istanbul ignore next */
          console.error(e);
        }
      } else if (value.path && typeof value.path === 'string') {
        try {
          const buffer = await readChunk(value.path, 0, 4100);
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
        if (mimeTypes.lookup(args[i]) === mtype || args[i] === mtype) {
          return true;
        }
      }

      return false;
    },
  };
}
