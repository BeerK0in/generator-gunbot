'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

var promptsParamsInit = {
  apiKey: 'this is the apikey',
  apiSecret: 'this is the apiSecret',
  btcTradingLimit: '123',
  strategy: 'BB',
  buyLevel: '456',
  gainLevel: '789',
  currencies: ['ABC', 'JKL', 'XYZ'],
  currenciesToStart: ['ABC', 'XYZ']
};

var promptsParamsAdd = {
  currencyToAdd: 'MNO',
  apiKey: 'this is the apikey',
  apiSecret: 'this is the apiSecret',
  btcTradingLimit: '987',
  strategy: 'GAIN',
  buyLevel: '654',
  gainLevel: '321',
  startCurrencyToAdd: true
};

describe('generator-gunbot:app init', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['init'])
      .withPrompts({
        apiKey: promptsParamsInit.apiKey,
        apiSecret: promptsParamsInit.apiSecret,
        btcTradingLimit: promptsParamsInit.btcTradingLimit,
        strategy: promptsParamsInit.strategy,
        buyLevel: promptsParamsInit.buyLevel,
        gainLevel: promptsParamsInit.gainLevel,
        currencies: promptsParamsInit.currencies,
        currenciesToStart: promptsParamsInit.currenciesToStart
      });
  });

  it('creates files', () => {
    assert.file([
      'base.config.js',
      'BTC_ABC-config.js',
      'BTC_JKL-config.js',
      'BTC_XYZ-config.js'
    ]);
  });

  it('creates sets the content of the files', () => {
    assert.fileContent([
      ['base.config.js', `BTC_TRADING_LIMIT: ${promptsParamsInit.btcTradingLimit},`],
      ['BTC_ABC-config.js', `BTC_TRADING_LIMIT: ${promptsParamsInit.btcTradingLimit},`],
      ['BTC_JKL-config.js', `BTC_TRADING_LIMIT: ${promptsParamsInit.btcTradingLimit},`],
      ['BTC_XYZ-config.js', `BTC_TRADING_LIMIT: ${promptsParamsInit.btcTradingLimit},`],

      ['base.config.js', `SELL_STRATEGY: '${promptsParamsInit.strategy}',`],
      ['BTC_ABC-config.js', `SELL_STRATEGY: '${promptsParamsInit.strategy}',`],
      ['BTC_JKL-config.js', `SELL_STRATEGY: '${promptsParamsInit.strategy}',`],
      ['BTC_XYZ-config.js', `SELL_STRATEGY: '${promptsParamsInit.strategy}',`]
    ]);
  });
});

describe('generator-gunbot:app add', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['add'])
      .withPrompts({
        apiKey: promptsParamsAdd.apiKey,
        apiSecret: promptsParamsAdd.apiSecret,
        btcTradingLimit: promptsParamsAdd.btcTradingLimit,
        strategy: promptsParamsAdd.strategy,
        buyLevel: promptsParamsAdd.buyLevel,
        gainLevel: promptsParamsAdd.gainLevel,
        currencyToAdd: promptsParamsAdd.currencyToAdd,
        startCurrencyToAdd: promptsParamsAdd.startCurrencyToAdd
      });
  });

  it('creates files', () => {
    assert.file([
      'BTC_MNO-config.js'
    ]);

    assert.noFile([
      'base-config.js',
      'BTC_ABC-config.js',
      'BTC_JKL-config.js',
      'BTC_XYZ-config.js'
    ]);
  });

  it('creates sets the content of the files', () => {
    assert.fileContent([
      ['BTC_MNO-config.js', `BTC_TRADING_LIMIT: ${promptsParamsAdd.btcTradingLimit},`]
    ]);
  });
});
