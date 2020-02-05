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

import {describe, beforeEach, it} from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import IotaMamWrapper from '../../src/iotaMam.wrapper';
import { mockConfigService, mockJson, root } from './mocks';
import { MAMFunction } from "../../src/iotaMam.constants";

chai.use(chaiAsPromised);

describe('#iotaMam', () => { 
    let mamWrapper: IotaMamWrapper;

    beforeEach('initialize', () => {
        mamWrapper = new IotaMamWrapper(mockConfigService);
    });
    describe('#IotaMamWrapper unit tests', () => {   
        it('should return non-null provider', async () => {
            sinon.stub(mamWrapper.getProvider(), 'fetch').resolves(mockJson);
            expect(mamWrapper.getProvider()).not.to.be.null;            
        }); 
        it('should return value ', async () => {
            sinon.stub(mamWrapper.getProvider(), 'fetch').resolves(mockJson);
            expect(mamWrapper.get(MAMFunction.PUBLIC, 'ramdom')).to.eventually.eq(mockJson); 
            expect(mamWrapper.get(MAMFunction.PRIVATE, 'ramdom')).to.eventually.eq(mockJson);            
        });
        it('should invoke with json ', async () => {
            sinon.stub(mamWrapper.getProvider(), 'publish').resolves(root);
            expect(mamWrapper.post(MAMFunction.PUBLIC, mockJson)).to.eventually.eq(root);            
            expect(mamWrapper.post(MAMFunction.PRIVATE, mockJson)).to.eventually.eq(root);            
        });
    });
});
