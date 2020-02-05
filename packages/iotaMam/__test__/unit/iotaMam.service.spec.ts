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
import { describe, beforeEach, it } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import IotaMamWrapper from '../../src/iotaMam.wrapper';
import { mockConfigService, mockJson, root } from './mocks';
import { IotaMamService } from '../../src/iotaMam.service';
import { MAMFunction } from "../../src/iotaMam.constants";

chai.use(chaiAsPromised);

describe('#iotaMam', () => {
    let mamWrapper: IotaMamWrapper;
    let mamService: IotaMamService;

    beforeEach('initialize', () => {
        mamWrapper = new IotaMamWrapper(mockConfigService);
        mamService = new IotaMamService(mamWrapper);
    });
    describe('#IotaMamService unit tests', () => {
        it('should return result', async () => {
            sinon.stub(mamWrapper.getProvider(), 'fetch').resolves(mockJson);
            const resp = await mamService.query(MAMFunction.PUBLIC, [root]);
            expect(resp).to.eq(mockJson);
        });

        it('should throw error for invalid function', async () => {
            try {
                await mamService.query('invalid', [root]);
            }
            catch (err) {
            }
        });

        it('should return result', async () => {
            sinon.stub(mamWrapper.getProvider(), 'publish').resolves(root);
            expect(mamService.invoke(MAMFunction.PUBLIC, [JSON.stringify(mockJson)])).to.eventually.eq(root);
        });
        it('should throw error for invalid function', async () => {
            try {
                await mamService.invoke('invalid', [JSON.stringify(mockJson)]);
            }
            catch (err) {
            }
        });
    });
});
