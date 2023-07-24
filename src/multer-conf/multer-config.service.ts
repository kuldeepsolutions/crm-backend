import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(csv|vnd.*|xls)$/)) {
          // jpg|jpeg|png|gif|
          cb(null, true);
        } else {
          cb(new Error('Not allowed'), false);
        }
      },

      // save file with original name
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          // const randomName = Array(32)
          //   .fill(null)
          //   .map(() => Math.round(Math.random() * 16).toString(16))
          //   .join('');
          return cb(null, `${file.originalname}`);
        },
      }),
    };
  }
}