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
import {Injectable, Inject} from '@nestjs/common';
import {DLTService} from '@suwannee/dlt';
import {DevopsDto} from './model/Devops.dto';
import {Action} from './model/Action.enum';
import path = require('path');
import {NON_SUPPORTED_ACTION, UPLOAD_SMART_CONTRACT} from './api.constants';
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
    constructor (@Inject('BlockchainService') private readonly blochainService: DLTService) {}
    /**
     * Query Transaction
     *
     * @param {string} functionName
     * @param {string[]} [functionArguments]
     * @param {string} [applicationId]
     * @param {string} [applicationContext]
     * @param {string} [identity]
     * @param {Object} [transientData]
     * @returns {Promise<any>}
     * @memberof ApiService
     */
    public async query(
        functionName: string,
        functionArguments?: string[],
        applicationId?: string,
        applicationContext?: string,
        identity?: string
    ): Promise<any> {
        return this.blochainService.query(functionName, functionArguments, applicationId,
            applicationContext, identity);
    }

    /**
     *Invoke Transaction
     *
     * @param {string} functionName
     * @param {string[]} [functionArguments]
     * @param {string} [applicationId]
     * @param {string} [applicationContext]
     * @param {string} [identity]
     * @param {Object} [transientData]
     * @param {string} [eventName]
     * @param {string} [callBackUrl]
     * @returns {Promise<any>}
     * @memberof ApiService
     */
    public async invoke(
        functionName: string,
        functionArguments?: string[],
        applicationId?: string,
        applicationContext?: string,
        identity?: string,
        transientData?: Object,
        eventName?: string,
        callBackUrl?: string

    ): Promise<any> {

        return this.blochainService.invoke(functionName, functionArguments, applicationId,
            applicationContext, identity, transientData, eventName, callBackUrl);
    }
    public async devops(devops: DevopsDto, contract?: Express.Multer.File) {
        const Spec = {
            language: devops.language, version: devops.version,
            uploadType: contract ? path.extname(contract.originalname).substr(1) : null
        };
        switch (devops.action) {
            case Action.deploy:
                if (!contract) {
                    throw new Error(UPLOAD_SMART_CONTRACT);
                }
                return this.blochainService.deploy(
                    contract, devops.applicationId, Spec, devops.applicationContext, devops.identity
                );
            case Action.upgrade:
                return this.blochainService.upgrade(
                    devops.applicationId, Spec, devops.functionName, devops.functionArguments, devops.applicationContext, devops.identity
                );
            case Action.instantiate:
                return this.blochainService.instantiate(
                    devops.applicationId, Spec, devops.functionName, devops.functionArguments, devops.applicationContext, devops.identity
                );
            default:
                throw new Error(NON_SUPPORTED_ACTION);

        }
    }
}
