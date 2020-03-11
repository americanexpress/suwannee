import {command} from 'commander';
import {AppConstants} from './app.constants';

/**
 * Add flags
 */
export const ConfigFlag = command(AppConstants.START_CMD) as any;

ConfigFlag
    .option(AppConstants.CONFIG_FLAG, AppConstants.CONFIG_FLAG_DESCRIPTION)
    .parse(process.argv);
export const AppConfig = ConfigFlag.config;
