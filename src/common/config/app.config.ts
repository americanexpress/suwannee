/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import 'dotenv/config';
import {AppConfig} from '../../configFlag';

let validateInput = (appConfigs: any): any => {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
        /**
        *  Application config
        */

        api: Joi.object({
            documentation: Joi.object({
                description: Joi.string().allow(null, '').default('Suwannee connect API'),
                title: Joi.string().allow(null, '').default('Suwannee connect API'),
                version: Joi.string().allow(null, '').default('1.0'),
                repo: Joi.string().allow(null, '').default('REPO'),
                repoUrl: Joi.string().allow(null, '').default('REPO_URL'),
            }),
            environment: Joi.object({
                domainUrl: Joi.string().allow(null, '').default('NO_DOMAIN_URL'),
                nodeEnv: Joi.string().valid('local', 'dev', 'test', 'prod').default('local'),
                platform: Joi.string().valid('fabric', 'corda').required(),
                port: Joi.number().default(8443),
                tlsEnable: Joi.boolean().default(true),

                /**
                 * Use below config if TLS is used
                 */
                tls: Joi.object({
                    // tslint:disable-next-line: max-line-length
                    ca: Joi.string().allow(null, '').when('.tlsEnable', {is: true, then: Joi.string()}),
                    certPath: Joi.string().allow(null, ''),
                    keyPath: Joi.string().allow(null, ''),
                    passPhrase: Joi.string().allow(null, ''),
                    passPhraseEncoding: Joi.string().allow(null, ''),
                    seed: Joi.string().allow(null, '')
                })
            }),
            security: Joi.object({
                apiAuthEnable: Joi.boolean().default('true'),
                publicKeys: Joi.string().allow(null, '').when('apiAuthEnable', {is: 'true', then: Joi.string().required()})
            })
        }),
        logging: Joi.object({
            type: Joi.string().example('local'),
            format: Joi.string().example(':id :req[header] :pid :method :url :response-time   :status')
        }),
        dlt: Joi.object({
            /**
              * Fabric wallet and connection profile
              */
            fabric: Joi.object({
                applicationContext: Joi.string(),
                connectionProfile: Joi.string(),
                wallet: Joi.string(),
            }).pattern(/./, [Joi.string(), Joi.number(), Joi.boolean(), Joi.object()]),
            /**
             * Corda config
             */
            corda: Joi.object({
                cordaUrl: Joi.string()
            }).pattern(/./, [Joi.string(), Joi.number(), Joi.boolean(), Joi.object()])
        }).pattern(/./, [Joi.string(), Joi.number(), Joi.boolean(), Joi.object()])
    });
    const {error, value: validatedAppConfig} = envVarsSchema.validate(
        appConfigs,
    );
    /* istanbul ignore if */
    if (error) {
        // tslint:disable-next-line: no-unused-expression
        throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedAppConfig;
};
const appConfig = validateInput(JSON.parse(fs.readFileSync((process.env.NODE_ENV === 'test') ? './example.config.json' : AppConfig).toString()));
// tslint:disable-next-line: no-default-export
export default {
    dlt: appConfig.dlt,
    logging: appConfig.logging,
    nodeEnv: appConfig.api.environment.nodeEnv,
    port: appConfig.api.environment.port || 3000,
    auth: appConfig.api.security.apiAuthEnable || 'ENABLED',
    domainUrl: appConfig.api.environment.domainUrl || '',
    tlsEnable: appConfig.api.environment.tlsEnable || false,
    publicKeys: appConfig.api.security.publicKeys,
    keyPath: appConfig.api.environment.tls.keyPath || '',
    certPath: appConfig.api.environment.tls.certPath || '',
    ca: appConfig.api.environment.tls.ca || '',
    passphrase: appConfig.api.environment.tls.passphrase || '',
    passphraseEncoding: appConfig.api.environment.tls.passphraseEncoding || '',
    repo: appConfig.api.documentation.repo || '',
    repoUrl: appConfig.api.documentation.repoUrl || '',
    title: appConfig.api.documentation.title || 'Suwannee connect API',
    version: appConfig.api.documentation.version || '1.0',
    platform: appConfig.api.environment.platform,
    description: appConfig.api.documentation.description || 'Suwannee connect API',

    isApiAuthEnabled(): boolean {
        return Boolean(appConfig.api.security.apiAuthEnable);
    },
    useSSL() {
        return Boolean(appConfig.api.environment.tlsEnable);
    },
};
