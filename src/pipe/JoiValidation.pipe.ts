/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import Joi from '@hapi/joi';
import {PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus} from '@nestjs/common';
/**
 * Joi Validation pipe to validate the input
 *
 * @export
 * @class JoiValidationPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {

    constructor (private readonly schema: Joi.ObjectSchema | any) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const {error} = this.schema.validate(value);
        if (error) {
            throw new HttpException({
                message: 'Validation failed',
                detail: error.message.replace(/"/g, `'`),
                statusCode: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
