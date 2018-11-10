const config = require('./protractor.conf.js').config;

config.capabilities = {
  'browserName': 'chrome',
  'chromOptions': {
    'args': ['--headless', '--disable-gpu']
  }
};

exports.config = config;
