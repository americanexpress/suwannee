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
import {HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {readFileSync} from 'fs';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from 'nestjs-config';
import {
    ASCII, BASE64, CLIENT_IDENTIFIER, DELIMETER_SPACE,
    EMPTYSTRING, INVALID_AUTH_HEADER_FORMAT, INVALID_CLIENT_ID_MESSAGE,
    INVALID_TOKEN_MESSAGE, RESPONSE, TOKEN_HEADER_KEY, TOKEN_MISSING_MESSAGE, TOKEN_VALIDITY,
} from './jwt.middleware.constants';
import {AppConstants} from '../app.constants';
@Injectable()
export class JwtMiddleware implements NestMiddleware {
    private keysFile: string;
    private client;
    constructor (private config: ConfigService) {
        this.config = config.get(AppConstants.CONFIG);
    }
    use(req: Request, res: Response, next: Function) {
        const authorizationHeader = req.get(TOKEN_HEADER_KEY);
        try {
            if (!authorizationHeader) {
                throw new Error(TOKEN_MISSING_MESSAGE);
            }
            const token = authorizationHeader.split(DELIMETER_SPACE)[1];
            if (!token || token.trim() === EMPTYSTRING) {
                throw new Error(INVALID_AUTH_HEADER_FORMAT);
            }
            const decode = jwt.decode(token);
            if (!decode || !decode[CLIENT_IDENTIFIER]) {
                throw new Error(INVALID_TOKEN_MESSAGE);
            }

            const clientId = decode[CLIENT_IDENTIFIER];
            try {
                this.keysFile = readFileSync(this.config.publicKeys).toString();
            } catch (err) {
                throw new Error(`Invalid key file`);
            }
            try {
                this.client = JSON.parse(this.keysFile).find((key) => key.clientId === clientId);
            } catch (err) {
                throw new Error(`Invalid token ${err.message}`);
            }

            if (!this.client) {
                throw new Error(INVALID_CLIENT_ID_MESSAGE);
            }
            jwt.verify(
                token,
                new Buffer(this.client.key, BASE64).toString(ASCII),
                {maxAge: TOKEN_VALIDITY},
                (err) => {
                    if (err) {
                        res.status(HttpStatus.UNAUTHORIZED).send({
                            message: err.name + ' , ' + err.message,
                            status: RESPONSE.FAILURE,
                            statusCode: HttpStatus.UNAUTHORIZED,
                        });
                        return;
                    } else {
                        return next();
                    }
                },
            );
        } catch (error) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                message: error.message,
                status: RESPONSE.FAILURE,
                statusCode: HttpStatus.UNAUTHORIZED,
            });
            return;
        }
    }
}
