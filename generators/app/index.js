'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const parameters = require('./parameters');
const altCurrencies = require('./currencies.js');
const defaultValues = require('./defaultValues.js');
const strategies = require('./strategies.js');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // The actions are: init, add
    this.argument('action', {type: String, required: true});

    // Helper function to start a GUNBOT for the given currency index.
    this.startGunbotCurrency = (currencies, index) => {
      if (!this.isCurrencyIndexValid(currencies, index)) {
        return;
      }

      let args = [
        'start',
        `./${parameters.gunbotExeName}`,
        '--name',
        `BTC_${currencies[index]}`,
        '--',
        `BTC_${currencies[index]}`,
        parameters.markets.poloniex.name];

      // Start GUNBOT
      let spawn = require('child_process').spawn;
      let process = spawn('pm2', args);

      // Print success or error
      process.on('close', code => {
        if (code) {
          this.log(`${chalk.red('ERROR!')} - There was an error starting GUNBOT for ${chalk.bold(`BTC_${currencies[index]}`)}:`);
          this.log(code);
          return;
        }

        this.log(`${chalk.green('YEAH!')} - Started GUNBOT for BTC_${currencies[index]}. :)`);

        // Start next bot if there are currencies left.
        index++;
        if (!this.isCurrencyIndexValid(currencies, index)) {
          return;
        }
        setTimeout(() => this.startGunbotCurrency(currencies, index), parameters.timeoutBetweenGunbotStarts);
      });
    };

    this.isCurrencyIndexValid = (currencies, index) => {
      if (currencies.length < index + 1) {
        return false;
      }

      if (currencies[index] === undefined) {
        return false;
      }

      return true;
    };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the well-made ${chalk.red('gunbot')} generator! We are in ${chalk.bold.yellow(this.options.action)} mode.`
    ));

    if (this.options.action === 'init') {
      this.log(chalk.green(' /-----------------------------------------------------------------------------------\\'));
      this.log(`  You need your Poloniex ${chalk.bold.green('API key')} and ${chalk.bold.green('API secret')} now to setup the GUNBOT config files.`);
      this.log('');
      this.log(`  Press ${chalk.bold('CTRL+C')} if you want to abort this process.`);
      this.log(`  Enter ${chalk.bold('ginit')} if you want to restart this process.`);
      this.log(chalk.green(' \\-----------------------------------------------------------------------------------/'));
      this.log('');
    }

    const prompts = [
      {
        when: () => this.options.action === 'init',
        type: 'input',
        name: 'poloniexApiKey',
        message: '[POLONIEX_KEY] Your Poloniex API key:',
        store: true
      }, {
        when: () => this.options.action === 'init',
        type: 'password',
        name: 'poloniexApiSecret',
        message: '[POLONIEX_SECRET] Your Poloniex API secret:',
        store: true
      }, {
        when: () => this.options.action === 'init',
        type: 'input',
        name: 'btcTradingLimit',
        message: '[BTC_TRADING_LIMIT] Max amount of BTC used by each pair per trade:',
        default: defaultValues.btcTradingLimit,
        store: true
      }, {
        when: () => this.options.action === 'add',
        type: 'input',
        name: 'btcTradingLimit',
        message: '[BTC_TRADING_LIMIT] Max amount of BTC used by the new pair per trade:',
        default: defaultValues.btcTradingLimit,
        store: true
      },

      // STRATEGY
      // ------------------------
      {
        type: 'list',
        name: 'buyStrategy',
        message: '[BUY_STRATEGY] What BUY strategy do you want to use?',
        default: defaultValues.buyStrategy,
        choices: strategies,
        store: true
      }, {
        type: 'list',
        name: 'sellStrategy',
        message: '[SELL_STRATEGY] What SELL strategy do you want to use?',
        default: defaultValues.buyStrategy,
        choices: strategies,
        store: true
      },

      // BUY SETTINGS
      // ------------------------
      {
        when: props => props.buyStrategy === 'BB',
        type: 'input',
        name: 'bbLow',
        message: '[LOW_BB] Percent. Buy if price is x% or less above the lowerst Bollinger Band:',
        default: defaultValues.bbLow,
        store: true
      }, {
        when: props => props.buyStrategy === 'GAIN',
        type: 'input',
        name: 'gainBuyLevel',
        message: '[BUY_LEVEL] Percent. Buy if price is x% below the lower ema value:',
        default: defaultValues.gainBuyLevel,
        store: true
      }, {
        when: props => props.buyStrategy === 'PINGPONG',
        type: 'input',
        name: 'pingpongBuyPrice',
        message: '[PINGPONG_BUY] Buy price:',
        default: defaultValues.pingpongBuyPrice,
        store: true
      }, {
        when: props => props.buyStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainBuyLevelOne',
        message: '[BUYLVL1] Percent. Buy when the price drops by x% or lower:',
        default: defaultValues.stepgainBuyLevelOne,
        store: true
      }, {
        when: props => props.buyStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainBuyLevelTwo',
        message: '[BUYLVL2] Percent. Buy when the price drops by x% or lower:',
        default: defaultValues.stepgainBuyLevelTwo,
        store: true
      }, {
        when: props => props.buyStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainBuyLevelThree',
        message: '[BUYLVL3] Percent. Buy when the price drops by x% or lower:',
        default: defaultValues.stepgainBuyLevelThree,
        store: true
      },

      // SELL SETTINGS
      // ------------------------
      {
        when: props => props.sellStrategy === 'BB',
        type: 'input',
        name: 'bbHigh',
        message: '[HIGH_BB] Percent. Sell if price is x% or less below the highest Bollinger Band:',
        default: defaultValues.bbHigh,
        store: true
      }, {
        when: props => props.sellStrategy === 'GAIN',
        type: 'input',
        name: 'gainSellLevel',
        message: '[GAIN] Percent. Sell if price is x% above bought price:',
        default: defaultValues.gainSellLevel,
        store: true
      }, {
        when: props => props.sellStrategy === 'PINGPONG',
        type: 'input',
        name: 'pingpongSellPrice',
        message: '[PINGPONG_SELL] Sell price:',
        default: defaultValues.pingpongSellPrice,
        store: true
      }, {
        when: props => props.sellStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainSellLevelOne',
        message: '[SELLLVL1] Percent. Sell if price is x% above bought price:',
        default: defaultValues.stepgainSellLevelOne,
        store: true
      }, {
        when: props => props.sellStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainSellLevelTwo',
        message: '[SELLLVL2] Percent. Sell if price is x% above bought price:',
        default: defaultValues.stepgainSellLevelTwo,
        store: true
      }, {
        when: props => props.sellStrategy === 'STEPGAIN',
        type: 'input',
        name: 'stepgainSellLevelThree',
        message: '[SELLLVL3] Percent. Sell if price is x% above bought price:',
        default: defaultValues.stepgainSellLevelThree,
        store: true
      },

      // CURRENCY/ CURRENCIES
      // ------------------------
      {
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
        message: 'Select the trade pair currencies you want to automatically start right now:',
        choices: props => props.currencies,
        default: props => props.currencies,
        store: true
      }, {
        when: () => this.options.action === 'add',
        type: 'list',
        name: 'currencyToAdd',
        message: 'Select the currency you want to add to GUNBOT:',
        choices: altCurrencies
      }, {
        when: () => this.options.action === 'add',
        type: 'confirm',
        name: 'startCurrencyToAdd',
        message: 'Do you want the new trade pair automatically start right now:',
        default: true,
        store: true
      }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    // INIT action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'init') {
      this.fs.copyTpl(
        this.templatePath('ALLPAIRS-params.js'),
        this.destinationPath('ALLPAIRS-params.js'), {
          poloniexApiKey: this.props.poloniexApiKey,
          poloniexApiSecret: this.props.poloniexApiSecret,
          btcTradingLimit: this.props.btcTradingLimit || defaultValues.btcTradingLimit,
          buyStrategy: this.props.buyStrategy || defaultValues.buyStrategy,
          sellStrategy: this.props.sellStrategy || defaultValues.sellStrategy,
          bbLow: this.props.bbLow || defaultValues.bbLow,
          bbHigh: this.props.bbHigh || defaultValues.bbHigh,
          gainBuyLevel: this.props.gainBuyLevel || defaultValues.gainBuyLevel,
          gainSellLevel: this.props.gainSellLevel || defaultValues.gainSellLevel,
          pingpongBuyPrice: this.props.pingpongBuyPrice || defaultValues.pingpongBuyPrice,
          pingpongSellPrice: this.props.pingpongSellPrice || defaultValues.pingpongSellPrice,
          stepgainBuyLevelOne: this.props.stepgainBuyLevelOne || defaultValues.stepgainBuyLevelOne,
          stepgainBuyLevelTwo: this.props.stepgainBuyLevelTwo || defaultValues.stepgainBuyLevelTwo,
          stepgainBuyLevelThree: this.props.stepgainBuyLevelThree || defaultValues.stepgainBuyLevelThree,
          stepgainSellLevelOne: this.props.stepgainSellLevelOne || defaultValues.stepgainSellLevelOne,
          stepgainSellLevelTwo: this.props.stepgainSellLevelTwo || defaultValues.stepgainSellLevelTwo,
          stepgainSellLevelThree: this.props.stepgainSellLevelThree || defaultValues.stepgainSellLevelThree
        }
      );

      for (let currency of this.props.currencies) {
        // Create empty config files.
        this.fs.copyTpl(
          this.templatePath(`${parameters.markets.poloniex.name}-BTX_XXX-config.js`),
          this.destinationPath(`${parameters.markets.poloniex.name}-BTC_${currency}-config.js`)
        );
      }
    }

    // ADD action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'add') {
      this.fs.copyTpl(
        this.templatePath(`${parameters.markets.poloniex.name}-BTX_XXX-config.js`),
        this.destinationPath(`${parameters.markets.poloniex.name}-BTC_${this.props.currencyToAdd}-config.js`)
      );
    }
  }

  install() {
    // INIT action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'init') {
      this.startGunbotCurrency(this.props.currenciesToStart, 0);
    }

    // ADD action
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.options.action === 'add') {
      if (this.props.startCurrencyToAdd) {
        this.startGunbotCurrency([this.props.currencyToAdd], 0);
      }
    }
  }

};
