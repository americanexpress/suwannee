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
import {Injectable} from '@nestjs/common';
import {Proxy} from 'braid-client/dist/Proxy';
import {ConfigService} from 'nestjs-config';
import {CONFIG, CONNECTION_OPEN, Delimeter, FLOW_ERROR, CONNECTION_CLOSED, LOGGER_LABEL} from './corda.constants';
import {Logger} from 'winston';
import {LoggerService} from '@suwannee/logger';

@Injectable()
export class BraidClient {
    private corda: any;
    private log: Logger;

    constructor (private config: ConfigService) {
        this.log = LoggerService.getLogger(LOGGER_LABEL);
    }
    public async onStart(flowName: string, functionArguments?: any[]) {
        this.config = this.config.get(CONFIG).dlt.corda;
        try {
            return new Promise((resolve, reject) => {
                const onOpen = () => {
                    this.log.info(CONNECTION_OPEN);
                    return this.executeFlow(flowName, functionArguments).then(
                        (res) => {
                            resolve(res);
                        },
                        (err) => {
                            this.log.error(err.message);
                            reject(err);
                        },
                    );
                };
                const onClose = () => {
                    this.log.info(CONNECTION_CLOSED);
                };
                const onError = (err) => {
                    this.log.error(FLOW_ERROR, err.message);
                    reject(err);
                };
                const configSettings = this.getConfigSettings(this.config.cordaUrl);
                this.corda = new Proxy(
                    {
                        // credentials: {
                        //     password: configSettings.password,
                        //     username: configSettings.username,
                        // },
                        url: configSettings.url,

                    },
                    onOpen,
                    onClose,
                    onError,
                    {
                        strictSSL: false,
                    },
                );
            });
        } catch (error) {
            throw error;
        }
    }
    public executeFlow = (name, args) => {

        return !args || args.length === 0 ? this.corda.flows[name]() : this.corda.flows[name](...args || null);
    }
    public getConfigSettings = (cordaUrl: string) => {
        const url =
            cordaUrl.split(Delimeter.DoubleFSlash)[0] +
            Delimeter.DoubleFSlash +
            cordaUrl.split(Delimeter.At)[1];
        const username = cordaUrl.split(Delimeter.DoubleFSlash)[1].split(Delimeter.Colon)[0];
        const password = cordaUrl.split(Delimeter.Colon)[2].split(Delimeter.At)[0];
        return {
            password,
            url,
            username,
        };
    }
}
