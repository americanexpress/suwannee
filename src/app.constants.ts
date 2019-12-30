/**
Copyright 2019 American Express Travel Related Services Company, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

export class AppConstants {
    public static APP_HEADER = 'suwannee';
    public static API_STARTED = `Blockchain connector starting... `;
    public static SWAGGER_URL = '/swagger';
    public static SWAGGER_STARTED = `swagger startted at http://localhost:`;
    public static START_CMD = `start`;
    public static START_CMD_DESCRIPTION = `Start BAAS Rest API`;
    public static START_CMD_ALIAS = `s`;
    public static CONFIG_FLAG = `-c, --config <ApplicationConfig>`;
    public static CONFIG_FLAG_DESCRIPTION = `Application config`;
    public static TEST_CMD = `test`;
    public static CLI_VERSION = `1.0.0`;
    public static APP_NAME = `suwannee`;
    public static BANNER_LAYOUT = `full`;
    public static LOGGER_LABEL = '[SUWANNEE]';
    public static CONFIG = 'app.config';
    public static CUSTOM_LOGGER_FORMAT = ':id :req[header] :pid :method :url :response-time   :status';
    public static APP_ERROR = 'Application can not be started 😐';
    public static HEADER = 'header';
    public static HTTP = 'http';
    public static HTTPS = 'https';
    public static LOCAL = 'local';

    public static AUTHORIZATION = 'Authorization';

    public static CORS_ORIGIN = '*';

    public static ID = 'id';
    public static PID = 'pid';
    public static RES_BODY = 'resbody';
    public static REQ_BODY = 'reqbody';
}
