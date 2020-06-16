// The configuration in this file are used for the running the app on development mode

import * as prodEnv from './environment.prod';

export const environment = {
  hmr: true,
  production: false
};

// Staging API environment
export const staging = {
  ... prodEnv.staging,
  ... environment,
  // ... {
  //   keyname: 'YOURVALUETOOVERWRITE' // Overwrite the keys to run on local environment
  // }
};

// Prod API environment
export const prod = {
  ... prodEnv.prod,
  ... environment,
  // ... {
  //   keyname: 'YOURVALUETOOVERWRITE' // Overwrite the keys to run on local environment
  // }
};
