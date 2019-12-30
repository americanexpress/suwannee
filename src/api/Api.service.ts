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
}
