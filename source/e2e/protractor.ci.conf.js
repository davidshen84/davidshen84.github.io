const config = require('./protractor.conf.js').config;

config.capabilities = {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['--headless', '--disable-gpu']
  }
};

exports.config = config;
