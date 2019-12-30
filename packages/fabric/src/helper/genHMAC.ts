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
import crypto from 'crypto';
import {SHA256, UTF_8, BASE_64} from '../fabric.constants';
import uuidV1 from 'uuid/v1';

export function genHMAC(clientId: string, clientSecret: string, resourcePath: string,
    host: string, port: string, httpMethod: string, payload: string, nonce: string = uuidV1(), timeStamp: number = Date.now()) {

    const BodyHash = crypto.createHmac(SHA256, clientSecret).update(payload, UTF_8).digest(BASE_64);
    const BaseString = `${timeStamp}\n${nonce}\n${httpMethod}\n${resourcePath}\n${host}\n${port}\n${BodyHash}`;
    const Signature = crypto.createHmac(SHA256, clientSecret).update(BaseString, UTF_8).digest(BASE_64);
    const HMACAuthorizationHeader = `ID="${clientId}",ts="${timeStamp}",nonce="${nonce}",bodyhash="${BodyHash}",mac="${Signature}"`;
    return HMACAuthorizationHeader;
}
