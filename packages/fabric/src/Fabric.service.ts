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
import fabricIntegration from 'fabric-integration';
import {ConfigService} from 'nestjs-config';
import {DLTService} from '@suwannee/dlt';
import {CONFIG, ERROR_MSG, ERROR, LOGGER_LABEL, BLOCK_MSG} from './fabric.constants';
import {LoggerService} from '@suwannee/logger';
import {requestHelper} from './helper/request.helper';
import {TransientMap} from 'fabric-integration/dist/types';
import {TX_MSG} from './fabric.constants';

/**
 * Fabric Service class, to connect to hyperledger fabric baas network
 *
 * @export
 * @class FabricService
 */
@Injectable()
export class FabricService implements DLTService {
    private log;
    /**
     * Creates an instance of FabricService.
     * @param {fabricIntegration} gateway Fabric Gateway
     * @param {ConfigService} config Application config
     * @memberof FabricService
     */
    constructor (private gateway: fabricIntegration, private config: ConfigService, ) {
        this.config = config.get(CONFIG).dlt.fabric;
        this.log = LoggerService.getLogger(LOGGER_LABEL);
    }

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
    // tslint:disable-next-line: max-line-length
    public async query(fn: string, args: string[], chaincodeId: string, channelName: string, identity: string, transientdata?: TransientMap): Promise<any> {
        await this.gateway.connect(this.config.connectionProfile, {
            identity,
            keystore: this.config.wallet,
        });
        const network = await this.gateway.getNetwork(channelName);
        const contract = await network.getContract(chaincodeId);
        const transaction = contract.createTransaction(fn);
        if (transientdata) {
            transaction.setTransient(transientdata);
        }
        const result = !args ? await transaction.evaluate() : await transaction.evaluate(...args);
        if (result.payload[0].includes(ERROR)) {
            this.log.error(ERROR_MSG);
            throw new Error(result.payload[0]);
        }
        return result.payload;
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
    public async invoke(fn: string, args: string[], chaincodeId: string, channelName: string, identity: string, transientdata?: TransientMap, eventName?: string, callBackUrl?: string): Promise<any> {

        await this.gateway.connect(this.config.connectionProfile, {
            identity,
            keystore: this.config.wallet,
        });

        const network = await this.gateway.getNetwork(channelName);
        const contract = await network.getContract(chaincodeId);
        const transaction = contract.createTransaction(fn);
        if (eventName) {
            transaction.addEventListner(eventName, (err, event, block, txid) => {
                this.log.info(`${TX_MSG} ${txid} \n ${BLOCK_MSG} ${block}`);
                if (err) {
                    this.log.error(err.message);
                    return requestHelper(callBackUrl, {error: err.message, txid: txid, block: block}, this.config.event_callback_auth);
                } else {
                    const data = {eventPayload: event.payload.toString(), txid: txid, block: block};
                    return requestHelper(callBackUrl, data, this.config.event_callback_auth);
                }
            },
            );
        }
        if (transientdata) {
            transaction.setTransient(transientdata);
        }
        const result = await transaction.submit(...args);
        if (result.payload[0].includes(ERROR)) {
            this.log.error(ERROR_MSG);
            throw new Error(result.payload[0]);
        }
        return result.payload;
    }
}
