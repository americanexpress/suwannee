
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

import {MamProvider} from 'twizt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from 'nestjs-config';
import {CONFIG} from './iotaMam.constants';
import {Logger} from 'winston';
import {LoggerService} from '@suwannee/logger';
import {LOGGER_LABEL, MAMFunction} from './iotaMam.constants';

@Injectable()
export default class IotaMamWrapper {
    private provider: MamProvider<any>;
    
    private nextRoot: string;
    private seed: string;
    private log:Logger;

    constructor (config: ConfigService) {
        // get provider and seed from config; for now, hard-code
        const mamConfig = config.get(CONFIG).dlt.iotaMam;
        this.seed = mamConfig.seed;
        this.provider = new MamProvider(mamConfig.nodeUrl, this.seed);
        this.log = LoggerService.getLogger(LOGGER_LABEL);
    }

    public getProvider(): MamProvider<any> {
        return this.provider;
    }

    public async post(scope: MAMFunction, message: any): Promise<string> {
        this.log.info(`Message sent: ${message}`);

        const sideKey = scope === MAMFunction.PRIVATE ? this.seed : null;

        this.nextRoot = await this.provider.publish(message, sideKey);
        return this.nextRoot;
    }

    public async get(scope: MAMFunction, root: string): Promise<any> {
        this.log.info(`Root sent: ${root}`);
        const sideKey = scope === MAMFunction.PRIVATE ? this.seed : null;

        return this.provider.fetch(root, sideKey);
    }
}
