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
import {DEFAULT_MSG} from './default.constants';
import {DLTService} from '@suwannee/dlt';

export class DefaultService implements DLTService {

    /**
     * Query Transaction
     * @param{chaincodeId} chaincode id
     * @param{channelName} channel name
     * @param{identity} Identity to which you have access to public and private keys or create a new id by passing a unique iD
     * @param{fn} chaincode function name
     * @param{args} arguments consumed by the function in an array of strings format
     * @returns {Promise<any>}
     * @memberof ApiService
     */

    public async query(fn: string, args: string[], chaincodeId: string, channelName: string,
        identity: string, transientdata?: Object): Promise<any> {
        return DEFAULT_MSG;
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
    // tslint:disable-next-line: max-line-length
    public async invoke(fn: string, args: string[], chaincodeId: string, channelName: string,
        identity: string, transientdata?: Object, eventName?: string, callBackUrl?: string): Promise<any> {
        return DEFAULT_MSG;
    }
}
