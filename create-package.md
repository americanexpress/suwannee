
# How to create a DLT package to use with suwannee

<p align="center">
<img width="600" src="./assets/suwannee.svg">
</p>

Suwannee can be extended by implementing [@suwannee/dlt](packages/dlt) `DLTService` interface ,

currently there are two packages (Corda,Hyperledger Fabric) are available.

To create a new package follow the below steps.

**Note**: It is encouraged to use [@nestjs](https://nestjs.com/) to create  modules , it helps integration with suwanne

**Step 1.**

`yarn add @suwannee/dlt`

**Step 2.**

```js

import {DLTService} form @suwannee/dlt

export  class FabricService implements  DLTService {}

```

**Step 3.**

Use Blockchain specific libraries to connect to the blockchain

DLT                 | Gateway connector
--------------------|------------------------------------
hyperledger fabric  | [fabric-integration](https://github.com/americanexpress/fabric-integration)
Corda               | [braid-client](https://www.npmjs.com/package/braid-client)
Ethereum            | [Web3](https://www.npmjs.com/package/web3)
.....               | .....
___________________________________________________________

**Step 4.**

To configure the the module use `config.get('app.config').dlt.blockchainName`

```js
constructor (private  gateway: NewBlockchainConnectorLib , private  config: ConfigService) {
this.config = config.get('app.config').dlt.newBlockchainName;
}
```

**Step 5.**

Use  [example.config.json]('example.config.json') for reference  
to pass on config parms to new  platform , modify your config file to include new platform.

 ```json
 "dlt":{
"newBlockchainName":{
"attr1":"...",
"attr2":"..."
...   : ...
}
}
```

**Step 6.**

Below is an example for hyperledger fabric:

```js
import {Injectable} from '@nestjs/common';
import fabricIntegration from 'fabric-integration';
import {ConfigService} from 'nestjs-config';
import {Log} from './utils/logging/Log.service';
import {DLTService} from '@suwannee/dlt';
/**
 * Fabric Service class, to connect to hyperledger fabric baas network
 *
 * @export
 * @class FabricService
 */
@Injectable()
export class FabricService implements DLTService {

    /**
     * Creates an instance of FabricService.
     * @param {fabricIntegration} gateway Fabric Gateway
     * @param {ConfigService} config Application config
     * @memberof FabricService
     */
    constructor (private gateway: fabricIntegration, private config: ConfigService) {
        this.config = config.get('app.config').dlt.fabric;
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
    public async query(fn: string, args: string[], chaincodeId: string, channelName: string, identity: string): Promise<any> {
        await this.gateway.connect(this.config.connectionProfile, {
            identity,
            keystore: this.config.wallet,
        });
        const network = await this.gateway.getNetwork(channelName);
        const contract = await network.getContract(chaincodeId);
        const transaction = contract.createTransaction(fn);
        const result = !args ? await transaction.evaluate() : await transaction.evaluate(...args);
        if (result.payload[0].includes('Error')) {
            Log.hlf.error('Error in processing the transaction');
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
    public async invoke(fn: string, args: string[], chaincodeId: string, channelName: string, identity: string, ): Promise<any> {

        await this.gateway.connect(this.config.connectionProfile, {
            identity,
            keystore: this.config.wallet,
        });

        const network = await this.gateway.getNetwork(channelName);
        const contract = await network.getContract(chaincodeId);
        const transaction = contract.createTransaction(fn);
        const result = await transaction.submit(...args);
        if (result.payload[0].includes('Error')) {
            Log.hlf.error('Error in processing the transaction');
            throw new Error(result.payload[0]);
        }
        return result.payload;
    }
}
```

**Step 7.**
Create a nestjs module ,
refer [this](https://docs.nestjs.com/modules) to learn how to create one.

Sample fabric module

```js

import {Module, DynamicModule} from '@nestjs/common';
import {ConfigService} from 'nestjs-config';
import fabricIntegration from 'fabric-integration';
import {FabricService} from './Fabric.service';
@Module({
    providers: [fabricIntegration, FabricService],
    exports: [fabricIntegration, FabricService,]
})
export class FabricModule {}

```


**Step 8.**

Create index.ts and export your module and service, similar to below and make dis/index.js as your main in package.json

```js
import {FabricModule} from './Fabric.module';
import {FabricService} from './Fabric.service';
export {FabricService} from './Fabric.service';
export {FabricModule} from './Fabric.module';

export default {
    module: FabricModule,
    service: FabricService
};

```

**Step 7.**

To use newly created module with suwannee core :

change directory to suwannee root and run

If the package is not hosted on npm registry

```bash
 yarn add <blockchain-package-name> -W
```

 or

If the package is not hosted in npm registry

``` bash
yarn add <blockchain-package-name>@file:<package-file-path> -W
```

create a `.env` file in the project root and add `PLATFORM = '<BLOCKCHAIN-PACKAGE-NAME-HERE>'`

```bash
yarn start start -c '<path to config file>'
```
