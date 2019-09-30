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
import { ApiService } from './../../src/api/Api.service';
import { describe, beforeEach, it } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import { MockFabricService, MockConfigService } from './__mocks__/mock';
import chai, { expect } from 'chai';

chai.use(chaiAsPromised);

describe('#apiService', () => {
    let apiService: ApiService;

    beforeEach(() => {
        apiService = new ApiService(MockFabricService, MockConfigService);

    });

    describe('#query', () => {
        it('should return success ', async () => {
            MockConfigService.PLATFORM = 'fabric';
            MockFabricService.query.resolves('success');
            return expect(apiService.query('', '', '', 'flowname', [])).eventually.to.equal('success');
        });
        it('should return error ', async () => {
            MockConfigService.PLATFORM = 'fabric';

            MockFabricService.query.rejects(new Error('error'));
            return expect(apiService.query('', '', '', 'flowname', [])).to.be.rejected;
        });
        it('should return error ', async () => {
            MockConfigService.PLATFORM = null;

            MockFabricService.query.resolves('success');
            return expect(apiService.query('', '', '', 'flowname', [])).to.be.rejected;
        });
        it('should return error ', async () => {
            MockConfigService.PLATFORM = 'TEST';
            MockFabricService.query.resolves('success');
            return expect(apiService.query('', '', '', 'flowname', [])).to.be.rejected;
        });
    });

    describe('#invoke', () => {
        it('should return success ', async () => {
            MockConfigService.PLATFORM = 'fabric';
            MockFabricService.invoke.resolves('success');
            return expect(apiService.invoke('a', 'b', 'c', 'd', [])).eventually.to.equal('success');
        });

        it('should return error ', async () => {
            MockConfigService.PLATFORM = 'tesst';
            MockFabricService.invoke.resolves('success');
            return expect(apiService.invoke('a', 'b', 'c', 'd', [])).to.be.rejected;
        });
        it('should return error ', async () => {
            MockConfigService.PLATFORM = 'fabric';
            MockFabricService.invoke.rejects(new Error('error'));
            return expect(apiService.invoke('a', 'b', 'c', 'd', [])).to.be.rejected;
        });
    });

});
