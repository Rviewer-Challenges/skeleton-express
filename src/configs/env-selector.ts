import EnvironmentConstants from "../constants/environment-constants";
import * as dotenv from 'dotenv';
import { resolve } from 'path';

export let envData: any = {};

export const getEnvironment = () => {
    switch (process.env.SKELETON_ENV) {
        case EnvironmentConstants.PRODUCTION:
            envData = dotenv.config({ path: resolve(__dirname, '../../.env') }).parsed;
            console.log('Environment: Production');
            break;
        case EnvironmentConstants.LOCAL:
            envData = dotenv.config({ path: resolve(__dirname, '../../.env.local') }).parsed;
            console.log('Environment: Local');
            break
        case EnvironmentConstants.DEVELOP:
            envData = dotenv.config({ path: resolve(__dirname, '../../.env.dev') }).parsed;
            console.log('Environment: Development');
            break;
        case EnvironmentConstants.TEST:
            envData = dotenv.config({ path: resolve(__dirname, '../../.env.test') }).parsed;
            console.log('Environment: Test');
            break;
        default:
            envData = dotenv.config().parsed;
    }
}