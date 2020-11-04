// The configuration in this file are used for the running the app on prod mode

export const environment = {
  hmr: false,
  production: true,
  RECAPTCHA_SITE_KEY: '6Ld8GLUUAAAAAH5CZbqDdQDwl-s5ZC2ZqHz5TWyj'
};

// Staging API environment
export const staging = {
  ... environment,
  ... {
    api: 'https://api-staging.civis.vote'
  },
};

// Prod API environment
export const prod = {
  ... environment,
  ... {
    api: 'https://api.civis.vote'
  }
};
