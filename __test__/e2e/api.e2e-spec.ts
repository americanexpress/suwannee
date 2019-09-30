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
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { ApplicationModule } from '../../src/App.module';
import { AppService } from '../../src/App.service';
import { INestApplication } from '@nestjs/common';
import mocha from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const before = mocha.before;
const afterAll = mocha.after;
const it = mocha.it;
const expect = chai.expect;
const newUser = 'bcUser20';

describe('#API E2E testing ', () => {
    let app: INestApplication;
    let appService = { findAll: () => ['test'] };

    before(async () => {
        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        })
            .overrideProvider(AppService)
            .useValue(appService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET Query`, () => {
        return request(app.getHttpServer())
            .get(`/api/blockchain?applicationId=marbles&applicationContext=defaultchannel&identity=${newUser}&functionName=read_everything`)
            .expect(200);

    });
    it(`/GET wrong Query`, () => {
        return request(app.getHttpServer())
            .get(`/api/blockchain?applicationId=marbles&applicationContext=defaultchannel&identity=${newUser}&functionName=read_everythings`)
            .expect(500);

    });
    it(`/POST Invoke`, () => {
        return request(app.getHttpServer())
            .post(`/api/blockchain`)
            .send({
                'applicationId': 'mychaincode',
                'applicationContext': 'defaultchannel',
                'identity': 'bcUser20',
                'functionName': 'move',
                'functionArguments': [
                    'a',
                    'b',
                    '10'
                ]
            })
            .expect(201);

    });

    afterAll(async () => {
        await app.close();
    });
});
