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
import { JoiValidationPipe } from '../../src/pipe/JoiValidation.pipe';
import { describe, it } from 'mocha';
import { RequestPayloadSchema } from '../../src/api/model/RequestPayload.schema';
import { expect } from 'chai';
describe('##JoiValidationPipe', () => {
    it('1)JoiValidationPipe Invalid value ', async () => {

        const body = {
            applicationId: 'a',
            applicationContext: 'b',
            identity: 'c',
            functionName: 'd',
            functionArguments: [10]
        };
        try {

            const { err } = new JoiValidationPipe(RequestPayloadSchema).transform(body, { type: RequestPayloadSchema });
        } catch (e) {
            console.log(e);
            expect(e.response.message).to.eql('Validation failed');

        }

    });
    it('2)JoiValidationPipe Valid value ', async () => {

        const body = {
            applicationId: 'a',
            applicationContext: 'b',
            identity: 'c',
            functionName: 'd',
            functionArguments: ['10']
        };
        const { err } = new JoiValidationPipe(RequestPayloadSchema).transform(body, { type: RequestPayloadSchema });
        // tslint:disable-next-line: no-unused-expression
        expect(err).to.be.undefined;
    });
    it('3)JoiValidationPipe Valid value ', async () => {

        const body = {
            applicationId: 'a',
            applicationContext: 'b',
            identity: 'c',
            functionName: 'd',
            functionArguments: ['10']
        };

        // tslint:disable-next-line: no-unused-expression
        expect(new JoiValidationPipe(RequestPayloadSchema)).to.not.be.undefined;
    });
});
