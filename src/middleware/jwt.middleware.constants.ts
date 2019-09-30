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
export const TOKEN_VALIDITY = '1d';
export const INVALID_TOKEN_MESSAGE = 'invalid token , expected clientId to be part of token payload';
export const TOKEN_MISSING_MESSAGE = 'Authorization header missing';
export const INVALID_AUTH_HEADER_FORMAT =
    'Invalid Authorization Header format, Expected Authorization: Bearer <jwtToken>';
export const INVALID_CLIENT_ID_MESSAGE = 'client not found';
export const CLIENT_IDENTIFIER = 'clientId';
export const TOKEN_HEADER_KEY = 'Authorization';
export enum RESPONSE {
    FAILURE = 'FAILURE',
    SUCCESS = 'SUCCESS',
}
export const EMPTYSTRING = '';
export const BASE64 = 'base64';
export const ASCII = 'ascii';
export const DELIMETER_SPACE = ' ';
