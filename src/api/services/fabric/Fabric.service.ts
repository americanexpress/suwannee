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
import fabricIntegration from 'fabric-integration';
import { ConfigService } from '../../../common/config/Config.service';

/**
 * Fabric Service class, to connect to hyperledger fabric baas network
 *
 * @export
 * @class FabricService
 */
@Injectable()
export class FabricService {
    /**
     * Creates an instance of FabricService.
     * @param {fabricIntegration} gateway Fabric Gateway
     * @param {ConfigService} config Application config
     * @memberof FabricService
     */
    constructor(private gateway: fabricIntegration, private config: ConfigService) { }

    /**
     * Query Trasaction
     * @param{chaincodeId} chaincode id
     * @param{channelName} channel name
     * @param{identity} Identity to which you have access to public and private keys or create a new id by passing a unique iD
     * @param{fn} chaincode function name
     * @param{args} arguments consumed by the function in an array of strings format
     * @returns {Promise<any>}
     * @memberof ApiService
     */
    // tslint:disable-next-line: max-line-length
    public async query(chaincodeId: string, channelName: string, identity: string, fn: string, args?: string[]): Promise<any> {

            await this.gateway.connect(this.config.CONNECTION_PROFILE, {
                identity,
                keystore: this.config.WALLET,
            });
            const network = await this.gateway.getNetwork(channelName);
            const contract = await network.getContract(chaincodeId);
            const transaction = contract.createTransaction(fn);
            const result = !args ? await transaction.evaluate() : await transaction.evaluate(...args);
             if(result.payload[0].includes('Error')){
                 throw new Error(result.payload[0]);
             }
                return result.payload ;

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
    public async invoke(args: string[], chaincodeId: string, channelName: string, identity: string, fn: string): Promise<any> {

            await this.gateway.connect(this.config.CONNECTION_PROFILE, {
                identity,
                keystore: this.config.WALLET,
            });

            const network = await this.gateway.getNetwork(channelName);
            const contract = await network.getContract(chaincodeId);
            const trasaction = contract.createTransaction(fn);
            const result = await trasaction.submit(...args);
            if(result.payload[0].includes('Error')){
                throw new Error(result.payload[0]);
            }
            return result.payload;

    }
}
