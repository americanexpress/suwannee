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
// tslint:disable: no-unused-expression
import {Test, TestingModule} from '@nestjs/testing';
import {AppService} from '../../src/App.service';
import {describe, beforeEach, it} from 'mocha';
import chai, {expect} from 'chai';

import * as main from '../../src/main';
describe('AppService', () => {
    let service: AppService;

    let appService = new AppService();
    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).overrideProvider(AppService)
            .useValue(appService)
            .compile();

        service = module.get<AppService>(AppService);
    });

    it('#AppService', () => {
        expect(service).to.be.instanceOf(AppService);
        expect(main.ApplicationConfig).to.be.undefined;
        expect(appService.bootstrap()[0]).to.be.undefined;
    });
});
