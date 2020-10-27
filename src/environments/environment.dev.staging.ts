import {environment as stagingEnv} from './environment.staging';

export const environment = {
    ...stagingEnv,
    development: true,
    staging: false,
};
