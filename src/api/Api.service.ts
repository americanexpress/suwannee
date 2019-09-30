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
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '../common/config/Config.service';
import { Log } from '../utils/logging/Log.service';
import { FABRIC, INVALID_PLATFORM } from './api.constants';
import { FabricService } from './services/fabric/Fabric.service';

/**
 * Class of ApiService
 *
 * @export
 * @class ApiService
 */
@Injectable()
export class ApiService {
    /**
     * Creates an instance of ApiService.
     * @param {ApiHelper} ApiHelper
     * @memberof ApiService
     */

    // tslint:disable-next-line: max-line-length
    constructor(private fabricService: FabricService, private config: ConfigService) { }
    /**
     * Query Trasaction (It is available only when app is configured to use  Fabric platform)
     * @param{chaincodeId}
     * @param{channelName}
     * @param{identity}
     * @param{fn}
     * @param{args}
     * @returns {Promise<any>}
     * @memberof ApiService
     */
    public async query(
        applicationId: string,
        applicationContext: string,
        identity: string,
        functionName: string,
        functionArguments?: string[]
    ): Promise<any> {
        try {
            if (this.config.PLATFORM === FABRIC) {
                return this.fabricService.query(applicationId, applicationContext,
                    identity, functionName, functionArguments);
            } else {
                throw new Error(`${this.config.PLATFORM}${INVALID_PLATFORM}`);
            }
        } catch (error) {
            Log.suwannee.error(error);
            throw new InternalServerErrorException(JSON.stringify(error));
        }
    }

    /**
     * Invoke Transaction
     *
     * @param {args} string[]
     * @param {chaincodeId} string
     * @param {channelName} string
     * @param {identity} string
     * @param {fn} string
     * @returns {Promise<any>}
     * @memberof ApiService
     */
    public async invoke(
        applicationId: string,
        applicationContext: string,
        identity: string,
        functionName: string,
        functionArguments: string[]
    ): Promise<any> {
        try {
            if (this.config.PLATFORM === FABRIC) {
                return this.fabricService.invoke(functionArguments, applicationId,
                    applicationContext, identity, functionName);
            } else {
                throw INVALID_PLATFORM;
            }
        } catch (error) {
            Log.suwannee.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}
