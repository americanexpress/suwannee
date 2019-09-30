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
import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser = require('body-parser');
import { readFileSync } from 'fs';
import morgan from 'morgan';
import uuid from 'uuid';
import { SWAGGER_STARTED, SWAGGER_URL } from './app.constants';
import { ApplicationModule } from './App.module';
import { ConfigService } from './common/config/Config.service';
import { Log } from './utils/logging/Log.service';

/**
 * To configure and run the app server
 * @example
 * ```js
 *
 * new AppService(new ConfigService()).bootstrap()
 * ```
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
    private app;
    private options;
    /**
     *Creates an instance of AppService.
     * @param {ConfigService} config
     * @memberof AppService
     */
    constructor(private config: ConfigService) { }

    /**
     *  To run the app server with given configuration
     *
     * @memberof AppService
     */
    public bootstrap = async () => {
        try {

            if (!this.config.useSSL()) {
                this.app = await NestFactory.create(ApplicationModule);
                this.options = new DocumentBuilder()
                    .setTitle(this.config.API_TITLE)
                    .setDescription(this.config.API_DESCRIPTION)
                    .setVersion(this.config.API_SWAGGER_VERSION)
                    .setExternalDoc(
                        this.config.REPO,
                        this.config.REPO_URL,
                    )
                    .setSchemes('http')
                    .addBearerAuth('Authorization', 'header')
                    .build();
            } else {
                this.app = await NestFactory.create(ApplicationModule, {
                    httpsOptions: {
                        cert: readFileSync(this.config.SSL_CERT_PATH).toString() +
                            readFileSync(this.config.SSL_CA).toString(),
                        key: readFileSync(this.config.SSL_KEY_PATH).toString(),
                        passphrase: readFileSync(this.config.SSL_PASSPHRASE,
                            this.config.SSL_PASSPHRASE_ENCODING).toString(),
                    },
                });
                this.options = new DocumentBuilder()
                    .setTitle(this.config.envConfig.API_TITLE)
                    .setDescription(this.config.envConfig.API_DESCRIPTION)
                    .setVersion(this.config.envConfig.API_SWAGGER_VERSION)
                    .setExternalDoc(
                        this.config.REPO,
                        this.config.REPO_URL,
                    )
                    .setSchemes('https')
                    .addBearerAuth('Authorization', 'header')
                    .build();
            }

            this.app.enableCors({
                credentials: true,
                origin: 'http://localhost:8000',
            });
            this.app.use(bodyParser.json());

            const LogStream = {
                write: (log: string) => {
                    Log.suwannee.debug(log);
                },
            };
            if (this.config.NODE_ENV === 'LOCAL') {
                morgan.token('id', function getId(req: any) {
                    return req.id;
                });
                morgan.token('reqbody', function getReqbody(req) {
                    return req.body;
                });
                morgan.token('resbody', function getResbody(res) {
                    return res.body;
                });
                morgan.token('pid', function getPid(req: any) {
                    return req.process.pid;
                });

                function assignId(req, res, next) {
                    req.id = uuid.v4();
                    next();
                }
                this.app.use(assignId);
                morgan.token('pid', (request, response) => process.pid.toString());
                this.app.use(
                    morgan(':id :req[header] :pid :method :url :response-time   :status', { stream: LogStream }),
                );
            } else {
                this.app.use(Log.expressWinston);
                this.app.use((req, res, next) => {
                    req.id = uuid.v4();
                    next();
                });
            }

            /**
             * Swagger implementation
             */

            const document = SwaggerModule.createDocument(this.app, this.options);
            SwaggerModule.setup(SWAGGER_URL, this.app, document, {
                swaggerOptions: {},
            });

            /**
             * Start Chainservice API
             */
            await this.app.listen(this.config.PORT, () => {
                Log.suwannee.info(`${SWAGGER_STARTED}${this.config.PORT}${SWAGGER_URL}`);
            });
        } catch (err) {
            throw new Error(`Application can not be started 😐 ${err.message}`);
        }
    }
}
