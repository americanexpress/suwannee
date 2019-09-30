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
import { command } from 'commander';
import figlet from 'figlet';
import { API_STARTED, APP_HEADER, START_CMD, START_CMD_DESCRIPTION, START_CMD_ALIAS, CONFIG_FLAG, CONFIG_FLAG_DESCRIPTION, TEST_CMD, CLI_VERSION, APP_NAME, BANNER_LAYOUT } from './app.constants';
import { AppService } from './App.service';
import { ConfigService } from './common/config/Config.service';
import { Log } from './utils/logging/Log.service';

console.log(chalk.blue(figlet.textSync(APP_HEADER, { horizontalLayout: BANNER_LAYOUT })));
const program = command(TEST_CMD);
program.version(CLI_VERSION).description(APP_NAME);

/**
 * Add flags
 */
program
    .option(CONFIG_FLAG, CONFIG_FLAG_DESCRIPTION)
    .parse(process.argv);

export const ApplicationConfig = program.config;
export const CordaUrl = program.url;

/**
 * Start command
 */
program
    .command(START_CMD)
    .alias(START_CMD_ALIAS)
    .description(START_CMD_DESCRIPTION)
    .action(() => {
        Log.suwannee.info(API_STARTED);
        new AppService(new ConfigService()).bootstrap();

    });

program.parse(process.argv);
