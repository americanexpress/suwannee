#!/usr/bin/env node
/**
 * Copyrigt 2019 American Express Travel Related Services Company, Inc.
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
import chalk from 'chalk';
import figlet from 'figlet';
import {AppConstants} from './app.constants';
import {AppService} from './App.service';
import {Log} from './utils/logging/Log.service';
import {ConfigFlag, AppConfig} from './configFlag';

console.log(chalk.blue(figlet.textSync(AppConstants.APP_HEADER, {horizontalLayout: AppConstants.BANNER_LAYOUT})));
const program = ConfigFlag;
program.version(AppConstants.CLI_VERSION).description(AppConstants.APP_NAME);
export const ApplicationConfig = AppConfig;
program
    .command(AppConstants.START_CMD)
    .alias(AppConstants.START_CMD_ALIAS)
    .description(AppConstants.START_CMD_DESCRIPTION)
    .action(() => {
        Log.suwannee.info(AppConstants.API_STARTED);
        new AppService().bootstrap();

    });
program.parse(process.argv);
