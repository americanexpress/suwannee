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

import sinon from 'sinon';
import {ConfigService} from 'nestjs-config';
import {IotaMamService} from './../../src/iotaMam.service';
import IotaMamWrapper from './../../src/iotaMam.wrapper';
import {MamProvider} from 'twizt';

const config = {
    'app.config':
    {
        'dlt': {
            'iotaMam': {
                'nodeUrl': 'https://nodes.thetangle.org:443',
                'seed': 'JVQJOVVOIQLVVEVXCEHBPEPCZFRIKMJJZMNDZJMELQYAKTOLNEKHFOFAGXAQWANAXFVDEVTDVUUDTJLHN'
            }
        }
    }
};

export const mockJson = {
    'someAttribute': 'someValue'
}

export const root = 'some random root';

export const mockMamProvider = sinon.createStubInstance(MamProvider);
export const mockIotaMamService = sinon.createStubInstance(IotaMamService);
export const mockIotaMamWrapper = sinon.createStubInstance(IotaMamWrapper);
export const mockConfigService = new ConfigService(config);

