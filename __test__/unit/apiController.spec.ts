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
import { Test } from '@nestjs/testing';
import { ApiController } from './../../src/api/Api.controller';
import { ApiService } from './../../src/api/Api.service';
import { FabricService } from './../../src/api/services/fabric/Fabric.service';
import { MockGateway, MockFabricService } from './__mocks__/mock';
import chai, { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import fabricIntegration from 'fabric-integration';
import sinon from 'sinon';
import { JoiValidationPipe } from '../../src/pipe/JoiValidation.pipe';

chai.use(chaiAsPromised);

describe('#ApiController', () => {
    let apiController: ApiController;
    let apiService: ApiService;
    const result = ['test', 'sd'];
    const MockApiService = sinon.createStubInstance(ApiService);
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [
                { provide: ApiService, useValue: MockApiService },
                { provide: fabricIntegration, useValue: MockGateway },
                { provide: FabricService, useValue: MockFabricService }
            ]
        }).compile();

        apiService = module.get<ApiService>(ApiService);
        apiController = module.get<ApiController>(ApiController);
    });

    describe('##query', () => {
        it('1)should return an test array sucessFully', async () => {
            MockApiService.query.resolves(result);
            const body = {
                applicationId: 'a',
                applicationContext: 'b',
                identity: 'c',
                functionName: 'd',
                functionArguments: ['e']
            };
            expect(await apiController.query(body)).to.eql(result);
            MockApiService.query.reset();
        });
    });
    describe('##invoke', () => {
        it('2)should return an test array sucessFully', async () => {
            MockApiService.invoke.resolves(result);
            const body = {
                applicationId: 'a',
                applicationContext: 'b',
                identity: 'c',
                functionName: 'd',
                functionArguments: ['e']
            };
            expect(await apiController.invoke(body)).to.eql(result);
            MockApiService.invoke.reset();
        });

    });
});
