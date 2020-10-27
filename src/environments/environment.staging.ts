import {environment as prodEnv} from './environment.prod';

export const environment = {
    ...prodEnv,
    staging: true,
    production: false,
    api: 'https://api-staging.civis.vote',
};
