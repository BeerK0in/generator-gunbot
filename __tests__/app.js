'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const mockSpawn = require('mock-spawn');
const parameters = require('../generators/app/parameters');
const defaultValues = require('../generators/app/defaultValues.js');

const promptsParamsInit = {
  market: 'poloniex',
  poloniexApiKey: 'this is the poloniexApiKey',
  poloniexApiSecret: 'this is the poloniexApiSecret',
  btcTradingLimit: '123',
  strategy: 'BB',
  currencies: ['ABC', 'DEF', 'JKL', 'XYZ'],
  currenciesToStart: ['ABC', 'DEF', 'XYZ']
};

const promptsParamsAdd = {
  market: 'bittrex',
  currencyToAdd: 'MNO',
  btcTradingLimit: '987',
  strategy: 'GAIN',
  startCurrencyToAdd: true
};

let mySpawn = mockSpawn();

describe('generator-gunbot:app init', () => {
  beforeAll(() => {
    mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;

    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withArguments(['init'])
      .withPrompts({
        market: promptsParamsInit.market,
        poloniexApiKey: promptsParamsInit.poloniexApiKey,
        poloniexApiSecret: promptsParamsInit.poloniexApiSecret,
        btcTradingLimit: promptsParamsInit.btcTradingLimit,
        buyStrategy: promptsParamsInit.strategy,
        sellStrategy: promptsParamsInit.strategy,
        currencies: promptsParamsInit.currencies,
        currenciesToStart: promptsParamsInit.currenciesToStart
      });
  });
  test('creates files', () => {
    assert.file([
      'ALLPAIRS-params.js'
    ]);

    for (let currency of promptsParamsInit.currencies) {
      assert.file([
        `${promptsParamsInit.market}-BTC_${currency}-config.js`
      ]);
    }
  });

  test('sets the content of the files', () => {
    for (let currency of promptsParamsInit.currencies) {
      assert.fileContent([
        [`${promptsParamsInit.market}-BTC_${currency}-config.js`, `BTC_TRADING_LIMIT: ${promptsParamsInit.btcTradingLimit},`],
        [`${promptsParamsInit.market}-BTC_${currency}-config.js`, `SELL_STRATEGY: '${promptsParamsInit.strategy}',`],
        [`${promptsParamsInit.market}-BTC_${currency}-config.js`, `LOW_BB: ${defaultValues.bbLow},`]
      ]);
    }
  });

  test('starts pm2', done => {
    setTimeout(() => {
      assert.equal(promptsParamsInit.currenciesToStart.length, mySpawn.calls.length);

      let index = 0;
      for (let currency of promptsParamsInit.currenciesToStart) {
        let spawnCall = mySpawn.calls[index];
        assert.equal('pm2', spawnCall.command);
        assert.deepEqual(['start',
          `./${parameters.gunbotExeName}`,
          '--name',
          `BTC_${currency}`,
          '--',
          `BTC_${currency}`,
          promptsParamsInit.market], spawnCall.args);
        assert.equal(0, spawnCall.exitCode);
        index++;
      }

      done();
    }, promptsParamsInit.currenciesToStart.length * parameters.timeoutBetweenGunbotStarts * 1.1);
  }, promptsParamsInit.currenciesToStart.length * parameters.timeoutBetweenGunbotStarts * 1.2);
});

describe('generator-gunbot:app add', () => {
  beforeAll(() => {
    mySpawn = mockSpawn();
    require('child_process').spawn = mySpawn;

    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['add'])
      .withPrompts({
        market: promptsParamsAdd.market,
        btcTradingLimit: promptsParamsAdd.btcTradingLimit,
        currencyToAdd: promptsParamsAdd.currencyToAdd,
        buyStrategy: promptsParamsAdd.strategy,
        sellStrategy: promptsParamsAdd.strategy,
        startCurrencyToAdd: promptsParamsAdd.startCurrencyToAdd
      });
  });

  test('creates files', () => {
    assert.file([
      `${promptsParamsAdd.market}-BTC_${promptsParamsAdd.currencyToAdd}-config.js`
    ]);

    assert.noFile([
      'ALLPAIRS-params.js'
    ]);

    for (let currency of promptsParamsInit.currencies) {
      assert.noFile([
        `${promptsParamsInit.market}-BTC_${currency}-config.js`
      ]);
    }
  });

  test('sets the content of the files', () => {
    assert.fileContent([
      [`${promptsParamsAdd.market}-BTC_${promptsParamsAdd.currencyToAdd}-config.js`, `BTC_TRADING_LIMIT: ${promptsParamsAdd.btcTradingLimit},`],
      [`${promptsParamsAdd.market}-BTC_${promptsParamsAdd.currencyToAdd}-config.js`, `SELL_STRATEGY: '${promptsParamsAdd.strategy}',`]
    ]);
  });

  test('starts pm2', () => {
    assert.equal(1, mySpawn.calls.length);

    let firstCall = mySpawn.calls[0];
    assert.equal('pm2', firstCall.command);
    assert.deepEqual(['start',
      `./${parameters.gunbotExeName}`,
      '--name',
      `BTC_${promptsParamsAdd.currencyToAdd}`,
      '--',
      `BTC_${promptsParamsAdd.currencyToAdd}`,
      promptsParamsAdd.market], firstCall.args);
    assert.equal(0, firstCall.exitCode);
  }, 20000);
});
