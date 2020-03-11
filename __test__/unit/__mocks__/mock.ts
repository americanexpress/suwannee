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
import {DefaultService} from '../../../src/common/default/Default.service';
import {Action} from '../../../src/api/model/Action.enum';

export const MockCordaService = sinon.createStubInstance(DefaultService);
export const MockFabricService = sinon.createStubInstance(DefaultService);
export const MockConfigService = new ConfigService();
export const FakeFile: Express.Multer.File = {
    buffer: new Buffer('empty', 'utf-8'),
    fieldname: 'empty.zip',
    filename: 'empty.zip',
    mimetype: 'zip',
    originalname: 'empty.zip',
    encoding: 'utf-8',
    size: 0,
    destination: '',
    path: ''
};
export const DeployDevops = {
    action: Action.deploy,
    applicationId: 'TEST',
    applicationContext: 'TEST',
    language: 'node',
    version: 'v1.0.0',
    identity: 'TEST',
    functionName: 'TEST',
    functionArguments: ['a'],
};
export const DefaultDevops = {
    action: null,
    applicationId: 'TEST',
    applicationContext: 'TEST',
    language: 'node',
    version: 'v1.0.0',
    identity: 'TEST',
    functionName: 'TEST',
    functionArguments: ['a'],
};
export const UpgradeDevops = {
    action: Action.upgrade,
    applicationId: 'TEST',
    applicationContext: 'TEST',
    language: 'node',
    version: 'v1.0.0',
    identity: 'TEST',
    functionName: 'TEST',
    functionArguments: ['a'],
};
export const InstantiateDevops = {
    action: Action.instantiate,
    applicationId: 'TEST',
    applicationContext: 'TEST',
    language: 'node',
    version: 'v1.0.0',
    identity: 'TEST',
    functionName: 'TEST',
    functionArguments: ['a'],
};
