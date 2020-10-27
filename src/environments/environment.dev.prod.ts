import {environment as prodEnv} from './environment.prod';

export const environment = {
    ...prodEnv,
    development: true,
    production: false,
};
