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
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { ApplicationConfig } from '../../main';
import 'dotenv/config';
export interface IEnvConfig {
    [key: string]: string;
}
export class ConfigService {

    public filePath = (process.env.NODE_ENV === 'test') ? './example.config.json' : ApplicationConfig;
    public config = JSON.parse(fs.readFileSync(this.filePath).toString());
    public envConfig = this.validateInput(this.config);
    public NODE_ENV = this.envConfig.NODE_ENV;
    public PORT = this.envConfig.PORT || 3000;
    public AUTH = this.envConfig.AUTH || 'ENABLED';
    public DOMAIN_URL = this.envConfig.DOMAIN_URL || '';
    public USE_SSL = this.envConfig.USE_SSL || false;
    public PUBLIC_KEYS = this.envConfig.PUBLIC_KEYS;

    /**
     * Use below config if SSL is used
     */
    /**
     *
     *
     * @memberof ConfigService
     */
    public SSL_KEY_PATH = this.envConfig.SSL_KEY_PATH || '';
    /**
     *
     *
     * @memberof ConfigService
     */
    public SSL_CERT_PATH = this.envConfig.SSL_CERT_PATH || '';
    /**
     *
     *
     * @memberof ConfigService
     */
    public SSL_CA = this.envConfig.SSL_CA || '';
    /**
     *
     *
     * @memberof ConfigService
     */
    public SSL_PASSPHRASE = this.envConfig.SSL_PASSPHRASE || '';
    /**
     *SSL_PASSPHRASE_ENCODING
     *
     * @memberof ConfigService
     */
    public SSL_PASSPHRASE_ENCODING = this.envConfig.SSL_PASSPHRASE_ENCODING || '';

    /**
     * Swagger Config information
     */
    public REPO = this.envConfig.REPO || '';
    public REPO_URL = this.envConfig.REPO_URL || '';
    public API_TITLE = this.envConfig.API_TITLE || 'BAAS connect API';
    public API_DESCRIPTION = this.envConfig.API_DESCRIPTION || 'BAAS connect API';
    public API_SWAGGER_VERSION = this.envConfig.API_SWAGGER_VERSION || '1.0';

    /**
     *  Application config
     */
    public APPLICATION_CONTEXT = this.envConfig.APPLICATION_CONTEXT;
    public PLATFORM = this.envConfig.PLATFORM;

    /**
     * Fabric wallet and connection profile
     */

    public CONNECTION_PROFILE = this.envConfig.CONNECTION_PROFILE;
    public WALLET = this.envConfig.WALLET;

    public isApiAuthEnabled(): boolean {
        return Boolean(this.envConfig.API_AUTH_ENABLED);
    }
    /**
     * yarn
     *
     * @memberof ConfigService
     */
    public useSSL = () => {
        return Boolean(this.envConfig.USE_SSL);
    }

    /**
     *
     *
     * @param {IEnvConfig} envConfig
     * @returns {IEnvConfig}
     * @memberof ConfigService
     */
    validateInput(envConfig: IEnvConfig): IEnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({

            API_AUTH_ENABLED: Joi.boolean().default('true'),
            DOMAIN_URL: Joi.string().allow(null, '').default('NO_DOMAIN_URL'),
            NODE_ENV: Joi.string()
                .valid('LOCAL', 'DEV', 'TEST', 'PROD')
                .default('LOCAL'),
            PORT: Joi.number().default(8443),
            PUBLIC_KEYS: Joi.string(),

            /**
             * Use below config if SSL is used
             */
            SSL_CA: Joi.string().allow(null, '').when('USE_SSL', { is: 'true', then: Joi.string().required() }),
            SSL_CERT_PATH: Joi.string().allow(null, '').when('USE_SSL', { is: 'true', then: Joi.string().required() }),
            SSL_KEY_PATH: Joi.string().allow(null, '').when('USE_SSL', { is: 'true', then: Joi.string().required() }),
            SSL_PASSPHRASE: Joi.string().allow(null, '').when('USE_SSL', { is: 'true', then: Joi.string().required() }),
            SSL_PASSPHRASE_ENCODING: Joi.string().allow(null, '').when('USE_SSL',
                { is: 'true', then: Joi.string().required() }),
            USE_SSL: Joi.boolean().default(false),

            /**
             * Swagger Config information
             */
            API_DESCRIPTION: Joi.string().allow(null, '').default('BAAS connect API'),
            API_SWAGGER_VERSION: Joi.string().allow(null, '').default('1.0'),
            API_TITLE: Joi.string().allow(null, '').default('BAAS connect API'),
            REPO: Joi.string().allow(null, '').default('REPO'),
            REPO_URL: Joi.string().allow(null, '').default('REPO_URL'),

            /**
             *  Application config
             */
            APPLICATION_CONTEXT: Joi.string().required(),
            PLATFORM: Joi.string().required(),

            /**
             * Fabric wallet and connection profile
             */
            CONNECTION_PROFILE: Joi.string(),
            WALLET: Joi.string(),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
