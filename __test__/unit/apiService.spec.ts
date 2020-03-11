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
import {ApiService} from './../../src/api/Api.service';
import {describe, it} from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import {MockFabricService, MockConfigService, MockCordaService, FakeFile, DefaultDevops, DeployDevops, UpgradeDevops, InstantiateDevops} from './__mocks__/mock';
import chai, {expect} from 'chai';
import config from '../../src/common/config/app.config';
import {UPLOAD_SMART_CONTRACT, NON_SUPPORTED_ACTION} from '../../src/api/api.constants';
chai.use(chaiAsPromised);

describe('#apiService', () => {
    let apiService: ApiService;
    describe('#query', () => {

        apiService = new ApiService(MockFabricService);
        it('1 should return success ', async () => {
            MockFabricService.query.resolves('success');
            return expect(apiService.query('', [''], '', 'function', '')).eventually.to.equal('success');
        });
        it('2 should return error ', async () => {
            MockFabricService.query.rejects(new Error('error'));
            return expect(apiService.query('', [''], '', 'function', '')).to.be.rejected;
        });
        it('Corda invoke return success ', async () => {
            apiService = new ApiService(MockCordaService);
            MockConfigService.platform = 'corda';
            MockCordaService.query.resolves('success');
            return expect(apiService.query('', [''], '', 'function', '')).eventually.to.equal('success');
        });

    });

    describe('#invoke', () => {
        it('should return success ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.invoke.resolves('success');
            return expect(apiService.invoke('a', ['b'], 'c', 'd', 'a')).eventually.to.equal('success');
        });
        it('should invoke corda return success ', async () => {
            apiService = new ApiService(MockCordaService);
            MockCordaService.invoke.resolves('success');
            return expect(apiService.invoke('a', ['b'], 'c', 'd', 'e')).eventually.to.equal('success');
        });
        it('should return error ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.invoke.rejects(new Error('error'));
            return expect(apiService.invoke('a', ['b'], 'c', 'd', 'e')).to.be.rejected;
        });
    });
    describe('#test app config', () => {
        expect(config.useSSL()).to.eqls(false);
    });
    describe('#Deploy', () => {
        it('Deploy , should return success ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.deploy.resolves('success');
            return expect(apiService.devops(DeployDevops, FakeFile)).eventually.to.equal('success');
        });
        it('Deploy , should return error with no contract is uploaded ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.deploy.resolves('success');
            return expect(apiService.devops(DeployDevops)).eventually.to.be.rejected.with.an.instanceOf(Error, UPLOAD_SMART_CONTRACT);
        });
        it('Upgrade , should return success ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.upgrade.resolves('success');
            return expect(apiService.devops(UpgradeDevops)).eventually.to.equal('success');
        });
        it('Instantiate , should return success ', async () => {
            apiService = new ApiService(MockFabricService);
            MockFabricService.instantiate.resolves('success');
            return expect(apiService.devops(InstantiateDevops)).eventually.to.equal('success');
        });
        it('Default , should return error ', async () => {
            apiService = new ApiService(MockFabricService);
            return expect(apiService.devops(DefaultDevops)).eventually.to.be.rejected.with.an.instanceOf(Error, NON_SUPPORTED_ACTION);
        });
    });
});
