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
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ConfigService } from '../../src/common/config/Config.service';
describe('## ConfigService', () => {
    it('1)ConfigService get API_DESCRIPTION', async () => {
        const config = new ConfigService();
        expect(config.API_DESCRIPTION).to.eql('BAAS connect API');
    });

    it('2)ConfigService get isApiAuthEnabled ', async () => {
        const config = new ConfigService();
        expect(config.isApiAuthEnabled()).to.eql(false);
    });
    it('3)ConfigService get useSSL ', async () => {
        const config = new ConfigService();
        expect(config.useSSL()).to.eql(false);
    });
    it('4)ConfigService validateInput ', async () => {
        const config = new ConfigService();
        try {
            config.validateInput({});
        } catch (e) {
            expect(e).to.be.instanceof(Error);
        }
    });
});
