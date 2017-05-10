# generator-gunbot [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Setup and manage GUNBOT x3 on Linux.

If you want to setup a brand new Debian or Ubuntu VPS to run GUNBOT, just log into your VPS as root and run this install script:

```bash
wget https://github.com/webcore-it/phantomjs-polyfill-array-from/blob/master/README.md | bash -
```

That script will 
 * update the system, 
 * install node 7.x, 
 * install required tools (yo, pm2), 
 * install the GUNBOT x3, 
 * install this generator-gunbot and 
 * start generator-gunbot

If you just want to use the generator on any OS with installed GUNBOT x3, read on.

## Installation

First, install [Yeoman](http://yeoman.io), [pm2](http://pm2.keymetrics.io/) and generator-gunbot using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g pm2
npm install -g generator-gunbot
```

## Usage

To init GUNBOT:

```bash
yo gunbot init
```

To add a new currency to GUNBOT:

```bash
yo gunbot add
```

## Limits

This initial version of the generator-gunbot has some limitations:

 * Only GUNBOT x3 support
 * Only Poloniex support
 * Only BTC to XXX support

## License

MIT © [BeerK0in]()


[npm-image]: https://badge.fury.io/js/generator-gunbot.svg
[npm-url]: https://npmjs.org/package/generator-gunbot
[travis-image]: https://travis-ci.org/BeerK0in/generator-gunbot.svg?branch=master
[travis-url]: https://travis-ci.org/BeerK0in/generator-gunbot
[daviddm-image]: https://david-dm.org/BeerK0in/generator-gunbot.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BeerK0in/generator-gunbot
[coveralls-image]: https://coveralls.io/repos/BeerK0in/generator-gunbot/badge.svg
[coveralls-url]: https://coveralls.io/r/BeerK0in/generator-gunbot
