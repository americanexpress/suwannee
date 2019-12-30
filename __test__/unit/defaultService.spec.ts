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
import DefaultPlatform from '../../src/common/default/index';
import {describe, it, after} from 'mocha';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PLATFORM} from '../../src/common/blockchain.constants';
chai.use(chaiAsPromised);

describe('#DefaultService', () => {

    describe('#invoke', () => {
        let defualtService = new DefaultPlatform.service();
        it('1 should return success ', async () => {expect(defualtService.invoke('a', ['a'], 'a', 'a', 'a')).eventually.to.equal('add env variable and restart the api');});

    });
    describe('#query', () => {
        let defualtService = new DefaultPlatform.service();
        it('2 should return success ', async () => {expect(defualtService.query('a', ['a'], 'a', 'a', 'a')).eventually.to.equal('add env variable and restart the api');});

    });

}
);
