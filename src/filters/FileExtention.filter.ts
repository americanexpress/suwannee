import * as path from 'path';
import {CDS, ZIP, INVALID_FILE_TYPE} from './filter.constants';
export function FileExtentionFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void): void {
    const Ext = path.extname(file.originalname);
    if (Ext == CDS || Ext == ZIP) {
        return callback(null, true);
    }
    req.fileValidationError = INVALID_FILE_TYPE;
    return callback(new Error(INVALID_FILE_TYPE), false);
}
