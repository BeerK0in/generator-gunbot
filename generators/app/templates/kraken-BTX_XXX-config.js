var config = {

  //-----------------------------------------------
  //  DEBUG
  //-----------------------------------------------
  DEBUG_LOG: false,
  I_REALLY_WANT_IT: false,
  BUY_SMALL_PORTION: 1,
  INSUFFICIENT_FUNDS_ON_SELL_FIX: 0.0005,
  INSUFFICIENT_FUNDS_ON_BUY_FIX: 0.0005,


  //-----------------------------------------------
  //   STARTUP OPTIONS
  //-----------------------------------------------
  SELL_ON_START: false,
  CANCEL_SELL_ORDERS_ON_START: false,
  CANCEL_BUY_ORDERS_ON_START: false,
  CANCEL_OPEN_ORDERS_ON_START: false,


  MAX_LATEST_PRICES: 300, // Limit of latest prices to analyze to determine if price is growing or falling.
  MAX_LATEST_PRICES_TREND: 30, // Limit of latest prices to analyze to determine if price is growing or falling.
  MAX_LATEST_DIRECTIONS: 30, // Limit of latest price directions, used in supergun detection.
  MAX_LAST_ORDERS: 5, // Keeping last orders bought.
  PERIOD: 15, // Candlestick period.

  SAVEFILE_SUFFIX: '-save.json',


  //-----------------------------------------------
  //  PRIMARY SETTINGS
  //-----------------------------------------------
  DEFAULT_MARKET_NAME: 'kraken',
  DEFAULT_CURRENCY_PAIR: 'BTC_ETH', // Single pair format for all markets!
  BTC_TRADING_LIMIT: <%= btcTradingLimit %>, // [DEFAULT: 0.01] Max amount of BTC balance to use for each pair.
  SECURITY_MARGIN: 60, // Sell all balance if currency decreases x% after you bought it.


  //-----------------------------------------------
  //  STRATEGY
  //-----------------------------------------------
  MIN_VOLUME_TO_BUY: 0.0005,  // Bitrex min volume.

  BUY_STRATEGY: '<%= buyStrategy %>', // [DEFAULT: BB] accepted values BB or STEPGAIN or GAIN or PINGPONG
  SELL_STRATEGY: '<%= sellStrategy %>', // [DEFAULT: BB] accepted values BB or STEPGAIN or GAIN or PINGPONG

  // BB
  LOW_BB: <%= bbLow %>, // [DEFAULT: 25] Percent. Buy if price is x% or less above the lowerst Bollinger Band.
  HIGH_BB: <%= bbHigh %>, // [DEFAULT: 25] Percent. Sell if price is x% or less below the highest Bollinger Band.

  // GAIN
  // Example:
  // if you set BUY_LEVEL to 3 and GAIN to 5,
  // - it will buy at 3% or more and
  // - it will sell at 5% or more
  BUY_LEVEL: <%= gainBuyLevel %>, // [DEFAULT: 3] Percent. Buy if price is x% below the lower ema value.
  GAIN: <%= gainSellLevel %>, // [DEFAULT: 5] Percent. Sell if price is x% above bought price.

  // PINGPONG
  PINGPONG_BUY: <%= pingpongBuyPrice %>, // [DEFAULT: 0.000001] Buy price.
  PINGPONG_SELL: <%= pingpongSellPrice %>, // [DEFAULT: 0.000002] Sell price.

  // STEPGAIN
  BUYLVL1: <%= stepgainBuyLevelOne %>, // [DEFAULT: 2] Percent. Buy if price is x% below the lower ema value. But try also to reach BUYLVL2
  BUYLVL2: <%= stepgainBuyLevelTwo %>, // [DEFAULT: 5] Percent. Buy if price is x% below the lower ema value. But try also to reach BUYLVL3
  BUYLVL3: <%= stepgainBuyLevelThree %>, // [DEFAULT: 41] Percent. Buy if price is x% below the lower ema value or even less.

  SELLLVL1: <%= stepgainSellLevelOne %>, // [DEFAULT: 2] Percent. Sell if price is x% above bought price. But try also to reach SELLLVL2
  SELLLVL2: <%= stepgainSellLevelTwo %>, // [DEFAULT: 5] Percent. Sell if price is x% above bought price. But try also to reach SELLLVL3
  SELLLVL3: <%= stepgainSellLevelThree %>, // [DEFAULT: 70] Percent. Sell if price is x% above bought price or even more.

  //-----------------------------------------------
  //   MARKETS
  //-----------------------------------------------
  //---BITTREX
  BITTREX_KEY: '<%= bittrexApiKey %>',
  BITTREX_SECRET: '<%= bittrexApiSecret %>',

  BITTREX_PRICE_METHOD:'ohlc',// ohlc OR vwa  price to buy definition method
  BITTREX_VWA_1_INTERVAL: 0.02,// weighted average interval in minutes
  BITTREX_VWA_2_INTERVAL: 0.04,// weighted average interval in minutes


  //---KRAKEN
  KRAKEN_ASSET_PAIR: 'XETHXXBT',

  KRAKEN_KEY: '<%= krakenApiKey %>',
  KRAKEN_SECRET: '<%= krakenApiSecret %>',

  KRAKEN_PRICE_METHOD:'ohlc',// ohlc OR vwa  price to buy definition method
  KRAKEN_VWA_1_INTERVAL: 0.02,// weighted average interval in minutes
  KRAKEN_VWA_2_INTERVAL: 0.04,// weighted average interval in minutes

  //---POLONIEX
  POLONIEX_KEY: '<%= poloniexApiKey %>',
  POLONIEX_SECRET: '<%= poloniexApiSecret %>',

  POLONIEX_PRICE_METHOD:'vwa',// ohlc OR vwa price to buy definition method
  POLONIEX_VWA_1_INTERVAL: 0.02,// weighted average interval in hours
  POLONIEX_VWA_2_INTERVAL: 0.04,// weighted average interval in hours


//-----------------------------------------------
  //   BOT TIMINGS
  //-----------------------------------------------
  // All timings are (milliseconds) * seconds
  BOT_SLEEP_DELAY: (1000) * <%= botSleepDelay %>, // [Default: 120] Bot cycle delay. Time the bot sleeps between cycles.
  BOT_ON_FAIL_DELAY: (1000) * <%= botOnFailSleepDelay %>, // [Default: 60] Bot repeat cycle delay if previous cycle failed.
  BOT_MAX_LIFETIME: 999999999, // Overall bot lifetime. 999999999 = 'never end'.
    API_CALLS_DELAY: 777,


    //-----------------------------------------------
    // EMAIL
    //-----------------------------------------------
    ALERT_ON_NO_FUNDS: false,  // Email on insufficcient funds.
    SMTP_EMAIL: '%40@gmail.com',
    ALERT_EMAIL: '********',
  SMTP_PASSWORD: '**********',
  SMTP: true,
  SMTP_PROTOCOL: 'SMTPS',
  SMTP_HOST: 'smtp.gmail.com',


  //-----------------------------------------------
  //  OUTPUT
  //-----------------------------------------------
  MAX_LATEST_PRICES_SHOWN: 0, // Limit of latest prices to show in console.log.
  SHOW_LASTEST_DIRECTIONS: false,  // Show chart in console.
  MAX_LATEST_DIRECTIONS_SHOWN: 0, // Chart height.
  LASTEST_DIRECTIONS_LIST_WIDTH: 0, // Chart width.


  //-----------------------------------------------
  //   OTHER (might be deprecated/not in use)
  //-----------------------------------------------
  BTC_BALANCE: 2 // BTC balance for test purposes.
};

module.exports = config;
