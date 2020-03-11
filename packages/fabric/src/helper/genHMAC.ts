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
