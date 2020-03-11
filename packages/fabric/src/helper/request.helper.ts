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
