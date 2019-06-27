// The configuration in this file are used for the running the app on prod mode

export const environment = {
  hmr: true,
  production: false
};

// Staging API environment
export const staging = {
  ... environment,
  ... {
    api: 'YOURAPIURL'
  },
};

// Prod API environment
export const prod = {
  ... environment,
  ... {
    api: 'YOURAPIURL'
  }
};
