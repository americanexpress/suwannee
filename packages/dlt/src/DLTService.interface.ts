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
export interface DLTService {
    query(fn: string, args?: string[], smartContractId?: string, contractContext?: string, identity?: string, transientdata?: any): any;
    invoke(fn: string, args: string[], smartContractId?: string, contractContext?: string, identity?: string, transientdata?: any, eventName?: string, callBackUrl?: string): any;
    deploy?(smartContract: Express.Multer.File, smartContractId: string, spec: any, contractContext?: string, identity?: string): any;
    upgrade?(smartContractId: string, spec: any, fn?: string, functionArgs?: any[], contractContext?: string, identity?: string): any;
    instantiate?(smartContractId: string, spec: any, fn?: string, functionArgs?: any[], contractContext?: string, identity?: string): any;
}
