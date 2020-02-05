
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

import { DLTService } from '@suwannee/dlt';
import { Injectable } from '@nestjs/common';
import IotaMamWrapper from './iotaMam.wrapper';
import { MAMFunction } from './iotaMam.constants';

@Injectable()
export class IotaMamService implements DLTService {

    constructor(private provider: IotaMamWrapper) { }

    private isValidFn(fn: string): boolean {
        const fnEnum = Object.keys(MAMFunction).find(key => MAMFunction[key] === fn);
        return MAMFunction[fnEnum] ? true : false;
    }

    async query(fn: string, args?: string[]): Promise<any> {

        if (!this.isValidFn(fn)) {
            throw new Error(`Valid function values are ${MAMFunction}`);
        }

        return this.provider.get(MAMFunction[fn], args.toString());
    }

    async invoke(fn: string, args: string[]): Promise<string> {

        if (!this.isValidFn(fn)) {
            throw new Error(`Valid function values are ${MAMFunction}`);
        }

        return this.provider.post(MAMFunction[fn], args.toString());
    }
}