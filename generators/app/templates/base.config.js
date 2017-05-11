var config = {
  //-----------------------------------------------
  //  PRIMARY SETTINGS
  //-----------------------------------------------
  DEFAULT_MARKET_NAME:"poloniex",
  DEFAULT_CURRENCY_PAIR:"BTC_PIVX",   //  single pair format for all markets !

  BTC_TRADING_LIMIT: <%= btcTradingLimit %>,// max amount of BTC balance to use for each pair
  SECURITY_MARGIN: 60, // sell all balance if currency decreases x% after you bought it
  MIN_VOLUME_TO_BUY: 0.0005,  // bitrex min volume
  LOW_BB: 5, //percentual from the lowest Bollinger Band you want to buy
  HIGH_BB: 5, //percentual from the highest Bollinger Band you want to sell
  SELL_STRATEGY: '<%= strategy %>', //sell strategy to use (BB or GAIN)
  BUY_STRATEGY: '<%= strategy %>', // buy strategy to use (BB or GAIN)
  BUY_LEVEL: <%= buyLevel %>, //percentual from weighted price you want to buy if the Bollinger Band are not complete yet or you want to use GAIN strategy

  //---BITTREX
  BITTREX_KEY:'',
  BITTREX_SECRET:'',
  BITTREX_GAIN: <%= gainLevel %>, // margin to sell when currency increases its value (example: sell when currency increases 2% of paid value - used only when Bollinger Band are not completely calculated or if you select GAIN strategy)
  BITTREX_PRICE_METHOD:'vWP',// vWP OR ohlc  "price to buy" definition method
  BITTREX_VWA_1_INTERVAL: 10,// weighted average interval in minutes
  BITTREX_VWA_2_INTERVAL: 120,// weighted average interval in minutes


  //---KRAKEN
  KRAKEN_ASSET_PAIR:'XETHXXBT',

  KRAKEN_KEY: '',
  KRAKEN_SECRET: '',

  KRAKEN_GAIN: <%= gainLevel %>, // margin to sell when currency increases its value (example: sell when currency increases 2.5% of paid value - used only when Bollinger Band are not completely calculated or if you select GAIN strategy)
  KRAKEN_PRICE_METHOD:'vWP',// vWP OR ohlc  "price to buy" definition method
  KRAKEN_VWA_1_INTERVAL: 1,// weighted average interval in minutes
  KRAKEN_VWA_2_INTERVAL: 15,// weighted average interval in minutes

  //---POLONIEX
  POLONIEX_KEY: '<%= apiKey %>',
  POLONIEX_SECRET: '<%= apiSecret %>',

  GAIN: <%= gainLevel %>, // margin to sell when currency increases its value (example: sell when currency increases 2.5% of paid value - used only when Bollinger Band are not completely calculated or if you select GAIN strategy)
  POLONIEX_PRICE_METHOD:'ohlc',// vWP OR ohlc  "price to buy" definition method (use ohlc with Poloniex)
  POLONIEX_VWA_1_INTERVAL: 0.02,// weighted average interval in hours
  POLONIEX_VWA_2_INTERVAL: 0.04,// weighted average interval in hours




  //-----------------------------------------------
  //   STARTUP OPTIONS
  //-----------------------------------------------

  SELL_ON_START:false,
  CANCEL_SELL_ORDERS_ON_START:false,
  CANCEL_BUY_ORDERS_ON_START:false,
  CANCEL_OPEN_ORDERS_ON_START:false,

  MAX_LATEST_PRICES: 500,// limit of latest prices to analyze to determine if price is growing or falling and to calculate Bollinger Band: the higher this amount the Best are Bollinger Band. Use 30 for GAIN strategy and 500 for BB.
  MAX_LATEST_DIRECTIONS:30,// limit of latest  price directions ,used in supergun detection
  MAX_LAST_ORDERS:500,  // keeping last orders bought
  PERIOD: 15,   // candlestick period

  SAVEFILE_SUFFIX: '-save.json',


  //-----------------------------------------------
  //   BOT TIMINGS
  //-----------------------------------------------
  API_CALLS_DELAY:777,
  BOT_SLEEP_DELAY:(1000)*<%= botSleepDelay %>,// bot cycle delay (koef*sec)
  BOT_MAX_LIFETIME:999999999,// overall bot lifetime(koef*min*hours) If you dont change this, the bot will stop to operate in 24 hours,
  BOT_ON_FAIL_DELAY:(1000)*<%= botSleepDelay %>, // bot repeat cycle delay if previous cycle failed  (koef*sec)
  //-----------------------------------------------
  // EMAIL
  //-----------------------------------------------
  ALERT_ON_NO_FUNDS:false,  // email on insufficcient funds
  SMTP_EMAIL: '%40@gmail.com',
  ALERT_EMAIL:'********',
  SMTP_PASSWORD: '**********',
  SMTP: true,
  SMTP_PROTOCOL: 'SMTPS',
  SMTP_HOST: 'smtp.gmail.com',


  //-----------------------------------------------
  //  DEBUG
  //-----------------------------------------------
  DEBUG_LOG:false,
  I_REALLY_WANT_IT:false,// debug hardcode hack
  BUY_SMALL_PORTION:1,// debug volume limiter,must be  1 > x > 0
  INSUFFICIENT_FUNDS_ON_SELL_FIX: 0.0005,


  //-----------------------------------------------
  //  OUTPUT
  //-----------------------------------------------
  MAX_LATEST_PRICES_SHOWN: 0, // limit of latest prices to show in console.log
  SHOW_LASTEST_DIRECTIONS:false,  // show chart in console
  MAX_LATEST_DIRECTIONS_SHOWN:0, // chart height
  LASTEST_DIRECTIONS_LIST_WIDTH:0, // chart width

  //-----------------------------------------------
  //   OTHER (might be deprecated/not in use)
  //-----------------------------------------------
  BTC_BALANCE: 2// btc balance for test purposes,
};

module.exports = config;
