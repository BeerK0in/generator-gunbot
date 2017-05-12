# generator-gunbot [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Setup and manage GUNBOT 3.2 on Linux.

If you want to setup a brand new Debian or Ubuntu VPS to run GUNBOT, just log into your new VPS as root and run this install script:

```bash
curl -qsL https://raw.githubusercontent.com/BeerK0in/generator-gunbot/master/install.sh | bash -- && exec bash
```
After the setup run:
```bash
ginit
```

That script will 
 * update the system (`apt upgrade`), 
 * install node 7.x, 
 * install required tools (`yo`, `pm2`, `unzip`), 
 * install the GUNBOT 3.2, 
 * creates some handy aliases,
 * install this generator-gunbot
 
If you want to create a VPS at DigitalOcean, you can use this affiliate link: [get $10 credit at DigitalOcean](https://m.do.co/c/fade3d3435ba) 

---

> **If you just want to use the generator on any OS with installed GUNBOT 3.2 Core Edition, read on.**

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
cd /path/to/gunbot
yo gunbot init
```

To add a new currency to GUNBOT:

```bash
yo gunbot add
```

## Limits

This initial version of the generator-gunbot has some limitations:

 * Only GUNBOT 3.2 support
 * Only Poloniex support
 * Only BTC to XXX support

## License

MIT © [BeerK0in](https://github.com/BeerK0in)


[npm-image]: https://badge.fury.io/js/generator-gunbot.svg
[npm-url]: https://npmjs.org/package/generator-gunbot
[travis-image]: https://travis-ci.org/BeerK0in/generator-gunbot.svg?branch=master
[travis-url]: https://travis-ci.org/BeerK0in/generator-gunbot
[daviddm-image]: https://david-dm.org/BeerK0in/generator-gunbot.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/BeerK0in/generator-gunbot
[coveralls-image]: https://coveralls.io/repos/github/BeerK0in/generator-gunbot/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/BeerK0in/generator-gunbot?branch=master

