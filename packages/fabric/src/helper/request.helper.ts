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
import axios from 'axios';
import uuidV1 from 'uuid/v1';
import {genHMAC} from './genHMAC';
import * as URL from 'url';
import {POST} from '../fabric.constants';
import 'dotenv/config';
export async function requestHelper(callBackUrl: string, data: any, auth: boolean) {

    const url = URL.parse(callBackUrl);
    const ClientID = process.env.CLIENT_ID;
    const ClientSecret = process.env.CLIENT_SECRET;
    const Payload = JSON.stringify(data);
    const HMAC = genHMAC(ClientID, ClientSecret, url.path, url.host, url.port, POST, Payload, uuidV1(), Date.now());
    const options = auth ? {
        headers: {Authorization: `MAC ${HMAC}`}
    } : null;
    const Resp = await axios.post(callBackUrl, data, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return Resp;
}
