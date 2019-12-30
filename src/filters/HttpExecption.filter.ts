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
import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Log} from '../utils/logging/Log.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            message: exception.message.error || exception.message,
            path: request.url,
            statusCode: status,
            timestamp: new Date().toISOString(),
        };

        response.status(status).json({
            message: exception.message.error || exception.message,
            method: request.method,
            path: request.url,
            statusCode: status,
            timestamp: new Date().toISOString(),

        });
        Log.suwannee.error(errorResponse);

    }
}
