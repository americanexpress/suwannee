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

export const INVALID_CONTEXT = 'apllicationContext not found';

export enum Delimeter {
    DoubleFSlash = '//',
    At = '@',
    Colon = ':',
}

export const QUERY_RESPONE = {
    description: 'Returns Query result',
    isArray: true,
    status: 200,
};
export const QUERY_PATH = 'blockchain';
export const QUERY_API_META_DATA = {
    title: 'Query blockchain',
    description: 'Query chaincode (Available when platform is set to Fabric)'
};
export const INVOKE_RESPONE = {
    description: 'Successfully executed smart contract ',
    status: 201,
};
export const INVOKE_PATH = 'blockchain';
export const INVOKE_API_META_DATA = {
    title: 'execute smart contracts',
    description: `Invoke  chaincode/workflows
    (can be used to invoke chaincode invoke corda functions and corda workflows)
     according to the application config setting`
};

export const OK = 'ok';
export const NON_SUPPORTED_ACTION = `use one of these actions ['deploy', 'upgrade', 'instantiate']`;
export const UPLOAD_SMART_CONTRACT = 'Please upload a smart contract and try again';
