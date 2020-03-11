import {DEFAULT_MSG} from './default.constants';
import {DLTService} from '@suwannee/dlt';

export class DefaultService implements DLTService {

    /**
     * Query Transaction
     *
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
    /**
     * Deploy the smart contract
     *
     * @param {Express.Multer.File} chaincode
     * @param {string} chaincodeId
     * @param {*} chaincodeSpec
     * @param {string} channelName
     * @param {string} identity
     * @returns {Promise<any>}
     * @memberof DefaultService
     */
    public async deploy(chaincode: Express.Multer.File, chaincodeId: string, chaincodeSpec: any, channelName: string, identity: string): Promise<any> {
        return DEFAULT_MSG;
    }
    /**
     * Upgrade the smart contract
     *
     * @param {string} chaincodeId
     * @param {*} chaincodeSpec
     * @param {string} [fn]
     * @param {any[]} [functionArgs]
     * @param {string} [channelName]
     * @param {string} [identity]
     * @returns {Promise<any>}
     * @memberof DefaultService
     */
    public async upgrade(chaincodeId: string, chaincodeSpec: any, fn?: string, functionArgs?: any[], channelName?: string, identity?: string): Promise<any> {
        return DEFAULT_MSG;
    }
    /**
     * Instantiate the smart contract
     *
     * @param {string} chaincodeId
     * @param {*} chaincodeSpec
     * @param {string} [fn]
     * @param {any[]} [functionArgs]
     * @param {string} [channelName]
     * @param {string} [identity]
     * @returns {Promise<any>}
     * @memberof DefaultService
     */
    public async instantiate(chaincodeId: string, chaincodeSpec: any, fn?: string, functionArgs?: any[], channelName?: string, identity?: string): Promise<any> {
        return DEFAULT_MSG;
    }
}
