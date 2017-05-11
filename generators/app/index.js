'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const altCurrencies = require('./currencies.js');

const BOT_SLEEP_DELAY = 30;

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('action', {type: String, required: true});

    this.startGunbotCurrency = (currency, timeoutCounter) => {
      let args = [
        'start',
        './index.js',
        '--name',
        `BTC_${currency}`,
        '--',
        `BTC_${currency}`,
        'poloniex'];

      setTimeout(() => {
        let spawn = require('child_process').spawn;
        let process = spawn('pm2', args);
        process.on('close', code => {
          if (code) {
            this.log('');
            this.log(`${chalk.red('ERROR!')} - There was an error starting GUNBOT for ${chalk.bold(`BTC_${currency}`)}. :(`);
            this.log('');
            return;
          }

          this.log('');
          this.log(`${chalk.green('YEAH!')} - Started GUNBOT for BTC_${currency}. :)`);
          this.log('');
        });
      }, timeoutCounter);
    };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the well-made ${chalk.red('gunbot')} generator!`
    ));

    this.log('');
    this.log(chalk.yellow('            /---------------------\\'));
    this.log(`            >>>    ${chalk.bold.yellow(this.options.action)} mode    <<<`);
    this.log(chalk.yellow('            \\---------------------/'));
    this.log('');

    if (this.options.action === 'init') {
      this.log(chalk.green(' /-----------------------------------------------------------------------------------\\'));
      this.log(`  You need your Poloniex ${chalk.bold.green('API key')} and ${chalk.bold.green('API secret')} now to setup the GUNBOT config files.`);
      this.log('');
      this.log(`  Press ${chalk.bold('CTRL + C')} if you want to abort this process.`);
      this.log(`  Enter ${chalk.bold('ginit')} if you want to restart this process.`);
      this.log(chalk.green(' \\-----------------------------------------------------------------------------------/'));
      this.log('');
    }

    const prompts = [
      {
        when: () => this.options.action === 'add',
        type: 'list',
        name: 'currencyToAdd',
        message: 'Select the currency you want to add to GUNBOT:',
        choices: altCurrencies
      }, {
        type: 'input',
        name: 'apiKey',
        message: '[POLONIEX_KEY] Your Poloniex API key:',
        store: true
      }, {
        type: 'password',
        name: 'apiSecret',
        message: '[POLONIEX_SECRET] Your Poloniex API secret:',
        store: true
      }, {
        type: 'input',
        name: 'btcTradingLimit',
        message: '[BTC_TRADING_LIMIT] Max amount of BTC used by each pair per trade:',
        default: '0.01',
        store: true
      }, {
        type: 'list',
        name: 'strategy',
        message: 'What strategy do you want to use?',
        default: 'BB',
        choices: [{value: 'BB', name: 'Bollinger Band'}, {value: 'GAIN', name: 'Gain'}],
        store: true
      }, {
        type: 'input',
        name: 'buyLevel',
        message: '[BUY_LEVEL] Percent from weighted price you want to buy:',
        default: '1',
        store: true
      }, {
        type: 'input',
        name: 'gainLevel',
        message: '[GAIN] Percent margin to sell when currency increases its value:',
        default: '2',
        store: true
      }, {
        when: () => this.options.action === 'init',
        type: 'checkbox',
        name: 'currencies',
        message: 'Select the currencies you want to trade:',
        choices: altCurrencies,
        store: true
      }, {
        when: () => this.options.action === 'init',
        type: 'checkbox',
        name: 'currenciesToStart',
        message: 'Select the currencies you want to automatically start right now:',
        choices: props => props.currencies,
        default: props => props.currencies,
        store: true
      }, {
        when: () => this.options.action === 'add',
        type: 'confirm',
        name: 'startCurrencyToAdd',
        message: 'Do you want the currencies to automatically start right now:',
        default: true,
        store: true
      }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    let botSleepDelay = BOT_SLEEP_DELAY;
    // INIT action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'init') {
      this.fs.copyTpl(
        this.templatePath('base.config.js'),
        this.destinationPath('base.config.js'), {
          apiKey: this.props.apiKey,
          apiSecret: this.props.apiSecret,
          btcTradingLimit: this.props.btcTradingLimit,
          strategy: this.props.strategy,
          buyLevel: this.props.buyLevel,
          gainLevel: this.props.gainLevel,
          botSleepDelay: botSleepDelay++
        }
      );

      for (let currency of this.props.currencies) {
        this.fs.copyTpl(
          this.templatePath('base.config.js'),
          this.destinationPath(`BTC_${currency}-config.js`), {
            apiKey: this.props.apiKey,
            apiSecret: this.props.apiSecret,
            btcTradingLimit: this.props.btcTradingLimit,
            strategy: this.props.strategy,
            buyLevel: this.props.buyLevel,
            gainLevel: this.props.gainLevel,
            botSleepDelay: botSleepDelay++
          }
        );
      }
    }

    // ADD action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'add') {
      this.fs.copyTpl(
        this.templatePath('base.config.js'),
        this.destinationPath(`BTC_${this.props.currencyToAdd}-config.js`), {
          apiKey: this.props.apiKey,
          apiSecret: this.props.apiSecret,
          btcTradingLimit: this.props.btcTradingLimit,
          strategy: this.props.strategy,
          buyLevel: this.props.buyLevel,
          gainLevel: this.props.gainLevel,
          botSleepDelay: botSleepDelay++
        }
      );
    }
  }

  install() {
    let timeoutCounter = 1;

    // INIT action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'init') {
      for (let currency of this.props.currencies) {
        if (this.props.currenciesToStart.indexOf(currency) >= 0) {
          this.startGunbotCurrency(currency, timeoutCounter);
          timeoutCounter += 6000;
        }
      }
    }

    // ADD action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'add') {
      if (this.props.startCurrencyToAdd) {
        this.startGunbotCurrency(this.props.currencyToAdd, timeoutCounter);
      }
    }
  }

};
