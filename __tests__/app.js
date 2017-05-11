'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const mockSpawn = require('mock-spawn');

const BOT_SLEEP_DELAY = 30;

const promptsParamsInit = {
  apiKey: 'this is the apikey',
  apiSecret: 'this is the apiSecret',
  btcTradingLimit: '123',
  strategy: 'BB',
  buyLevel: '456',
  gainLevel: '789',
  currencies: ['ABC', 'JKL', 'XYZ'],
  currenciesToStart: ['ABC', 'XYZ']
};

const promptsParamsAdd = {
  currencyToAdd: 'MNO',
  apiKey: 'this is the apikey',
  apiSecret: 'this is the apiSecret',
  btcTradingLimit: '987',
  strategy: 'GAIN',
  buyLevel: '654',
  gainLevel: '321',
  startCurrencyToAdd: true
};

jest.useRealTimers();
let mySpawn = mockSpawn();

describe('generator-gunbot:app init', () => {
  beforeEach(() => {
    mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;

    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
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

  test('starts pm2', function (done) {
    // This is bad practice but works for now.
    setTimeout(function () {
      assert.equal(promptsParamsInit.currenciesToStart.length, mySpawn.calls.length);

      let index = 0;
      for (let currency of promptsParamsInit.currenciesToStart) {
        let spawnCall = mySpawn.calls[index];
        assert.equal('pm2', spawnCall.command);
        assert.deepEqual(['start',
          './index.js',
          '--name',
          `BTC_${currency}`,
          '--',
          `BTC_${currency}`,
          'poloniex'], spawnCall.args);
        assert.equal(0, spawnCall.exitCode);
        index++;
      }

      done();
    }, 8000);
  }, 20000);

  test('creates files', () => {
    assert.file([
      'base.config.js',
      'BTC_ABC-config.js',
      'BTC_JKL-config.js',
      'BTC_XYZ-config.js'
    ]);
  });

  test('sets the content of the files', () => {
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

  test('increases BOT_SLEEP_DELAY for each file by one', () => {
    assert.fileContent([
      ['base.config.js', `BOT_SLEEP_DELAY:(1000)*${BOT_SLEEP_DELAY},`],
      ['BTC_ABC-config.js', `BOT_SLEEP_DELAY:(1000)*${BOT_SLEEP_DELAY + 1},`],
      ['BTC_JKL-config.js', `BOT_SLEEP_DELAY:(1000)*${BOT_SLEEP_DELAY + 2},`],
      ['BTC_XYZ-config.js', `BOT_SLEEP_DELAY:(1000)*${BOT_SLEEP_DELAY + 3},`]
    ]);
  });
});

describe('generator-gunbot:app add', () => {
  beforeEach(() => {
    mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;

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

  test('creates files', () => {
    assert.file([
      `BTC_${promptsParamsAdd.currencyToAdd}-config.js`
    ]);

    assert.noFile([
      'base-config.js',
      'BTC_ABC-config.js',
      'BTC_JKL-config.js',
      'BTC_XYZ-config.js'
    ]);
  });

  test('sets the content of the files', () => {
    assert.fileContent([
      [`BTC_${promptsParamsAdd.currencyToAdd}-config.js`, `BTC_TRADING_LIMIT: ${promptsParamsAdd.btcTradingLimit},`]
    ]);
  });

  test('starts pm2', () => {
    assert.equal(1, mySpawn.calls.length);

    let firstCall = mySpawn.calls[0];
    assert.equal('pm2', firstCall.command);
    assert.deepEqual(['start',
      './index.js',
      '--name',
      `BTC_${promptsParamsAdd.currencyToAdd}`,
      '--',
      `BTC_${promptsParamsAdd.currencyToAdd}`,
      'poloniex'], firstCall.args);
    assert.equal(0, firstCall.exitCode);
  }, 20000);
});
