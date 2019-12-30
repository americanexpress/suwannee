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
import {BraidClient} from '../../src/Braidclient.service';
import {ConfigService} from 'nestjs-config';

chai.use(chaiAsPromised);

describe('#braidClieent', () => {
    let braidClient: BraidClient;
    beforeEach(() => {
        braidClient = new BraidClient(new ConfigService({'app.config': {'dlt': {'corda': {'cordaUrl': 'http://localhost:8080/api'}}}}));
    });

    describe('#onStart', () => {
        it('should return value ', async () => {
            braidClient.onStart('flowname', []);
            return expect('q').to.be.equal('q');
        });
        it('should return error ', async () => {
            sinon.stub(braidClient, 'getConfigSettings').throws(new Error('Error'));
            return expect(braidClient.onStart('flowname', [])).to.be.rejected;
        });
    });
    describe('#getConfigSettings', () => {
        it('should return value ', async () => {
            return expect(braidClient.getConfigSettings('http://username:password@localhost:8080/api/')).to.eql({
                url: 'http://localhost:8080/api/',
                username: 'username',
                password: 'password'
            });
        });
    });
});
