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
import Gateway from 'fabric-integration';
import {FabricService} from '../../../src/Fabric.service';
import sinon from 'sinon';
import {ConfigService} from 'nestjs-config';
import Transaction from 'fabric-integration/dist/Transaction';

export const MockTransaction: any = sinon.createStubInstance(Transaction);
export const MockContract = {
    createTransaction: () => MockTransaction
};

export const MockNetwork = {
    getContract: fn => MockContract
};
export const MockGateway = sinon.createStubInstance(Gateway);
export const MockFabricService = sinon.createStubInstance(FabricService);
export const MockConfigService = sinon.createStubInstance(ConfigService);

