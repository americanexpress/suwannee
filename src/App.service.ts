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
import {Injectable, INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import bodyParser = require('body-parser');
import {readFileSync} from 'fs';
import morgan from 'morgan';
import uuid from 'uuid';
import {AppConstants} from './app.constants';
import {ApplicationModule} from './App.module';
import {Log} from './utils/logging/Log.service';
import {ConfigService} from 'nestjs-config';
import {SwaggerBaseConfig} from '@nestjs/swagger';
/**
 * To configure and run the app server
 * @example
 * ```js
 *
 * new AppService().bootstrap()
 * ```
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
    private app: INestApplication;
    private options: SwaggerBaseConfig;
    private config: ConfigService;

    /**
     *Creates an instance of AppService.
     * @param {ConfigService} config
     * @memberof AppService
     */

    /**
     *  To run the app server with given configuration
     *
     * @memberof AppService
     */

    public bootstrap = async () => {

        this.app = await NestFactory.create(ApplicationModule);
        this.config = ConfigService.get(AppConstants.CONFIG);
        try {
            if (!this.config.tlsEnable) {

                this.options = new DocumentBuilder()
                    .setTitle(this.config.title)
                    .setDescription(this.config.description)
                    .setVersion(this.config.version)
                    .setExternalDoc(
                        this.config.repo,
                        this.config.repoUrl,
                    )
                    .setSchemes('http')
                    .addBearerAuth(AppConstants.AUTHORIZATION, 'header')
                    .build();
            } else {
                this.app = await NestFactory.create(ApplicationModule, {
                    httpsOptions: {
                        cert: readFileSync(this.config.certPath).toString() +
                            readFileSync(this.config.ca).toString(),
                        key: readFileSync(this.config.keyPath).toString(),
                        passphrase: readFileSync(this.config.passphrase,
                            this.config.passphraseEncoding).toString(),
                    },
                });
                this.options = new DocumentBuilder()
                    .setTitle(this.config.title)
                    .setDescription(this.config.description)
                    .setVersion(this.config.version)
                    .setExternalDoc(
                        this.config.repo,
                        this.config.repoUrl,
                    )
                    .setSchemes('https')
                    .addBearerAuth(AppConstants.AUTHORIZATION, 'header')
                    .build();
            }

            this.app.enableCors({
                credentials: true,
                origin: AppConstants.CORS_ORIGIN,
            });
            this.app.use(bodyParser.json());

            const LogStream = {
                write: (log: string) => {
                    Log.suwannee.debug(log);
                },
            };
            if (this.config.logging.type === AppConstants.LOCAL) {
                morgan.token(AppConstants.ID, function getId(req: any) {
                    return req.id;
                });
                morgan.token(AppConstants.RES_BODY, function getReqbody(req) {
                    return req.body;
                });
                morgan.token(AppConstants.REQ_BODY, function getResbody(res) {
                    return res.body;
                });
                morgan.token(AppConstants.PID, function getPid(req: any) {
                    return req.process.pid;
                });

                function assignId(req: any, res: any, next: () => void) {
                    req.id = uuid.v4();
                    next();
                }
                this.app.use(assignId);
                morgan.token(AppConstants.PID, (request, response) => process.pid.toString());
                this.app.use(
                    morgan(this.config.logging.format, {stream: LogStream}),
                );
            } else {
                this.app.use(Log.expressWinston);
                this.app.use((req: any, res: any, next: () => void) => {
                    req.id = uuid.v4();
                    next();
                });
            }

            /**
             * Swagger implementation
             */

            const document = SwaggerModule.createDocument(this.app, this.options);
            SwaggerModule.setup(AppConstants.SWAGGER_URL, this.app, document, {
                swaggerOptions: {},
            });

            /**
             * Start Chainservice API
             */
            await this.app.listen(this.config.port, () => {
                Log.suwannee.info(`${AppConstants.SWAGGER_STARTED}${this.config.port}${AppConstants.SWAGGER_URL}`);
            });
        } catch (err) {
            throw new Error(`${AppConstants.APP_ERROR} ${err.message}`);
        }
    }
}
