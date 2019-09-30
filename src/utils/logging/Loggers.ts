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
import expressWinston from 'express-winston';
import { config, createLogger, format, Logger, transports } from 'winston';
import winston from 'winston';
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
export class Loggers {

    public static expressWinston = expressWinston.logger({
        colorize: false,
        expressFormat: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
        ),
        ignoreRoute() { return false; },
        level(req: { path: string; }, res: { statusCode: number; }) {
            let level = '';
            if (res.statusCode >= 100) { level = 'info'; }
            if (res.statusCode >= 400) { level = 'warn'; }
            if (res.statusCode >= 500) { level = 'error'; }
            if (res.statusCode === 401 || res.statusCode === 403) { level = 'error'; }
            if (req.path === '/v1' && level === 'info') { level = 'warn'; }
            return level;
        },
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        transports: [
            new winston.transports.Console(),
        ],

    });
    public static getLogger = (label: string) => {
        return createLogger({
            exitOnError: false,
            format: format.combine(

                format.colorize({ all: true }),
                format.timestamp(),
                format.label({ label }),
                format.logstash(),

            ),
            levels: config.syslog.levels,
            transports: [new transports.Console({
                handleExceptions: true,
                level: 'debug',
            })],
        });
    }

    // tslint:disable-next-line: member-ordering
    public static suwannee: Logger = Loggers.getLogger('[suwannee]');
    // tslint:disable-next-line: member-ordering
    public static corda: Logger = Loggers.getLogger('[CORDA]');
    // tslint:disable-next-line: member-ordering
    public static hlf: Logger = Loggers.getLogger('[FABRIC]');
}
