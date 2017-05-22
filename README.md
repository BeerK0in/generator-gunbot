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


**Aliases**

The installer also sets up some aliases to do more with less. :)

- `gcd`: Go to the folder GUNBOT is installed
- `gadd`: Use the generator to add a new pair _(*)_
- `gl`: Get a list of all running GUNBOTs
- `glog [botname or number]`: Shows the log of the selected bot (use `gl` to get name) 
- `gstop [botname or number]`: Stops a running bot (use `gl` to get name) 
- `gstart [botname or number]`: Starts a stopped bot (use `gl` to get name) 

_(*)For now `gadd` will use the same settings as defined in the first run of the generator. A next version will allow you to set specific strategies for new trade pairs._


**Updates**

To update follow these steps:cdg  

1. Login to your server.
2. Run this update script
```bash
curl -qsL https://raw.githubusercontent.com/BeerK0in/generator-gunbot/master/update.sh | bash --
```
3. Run `ginit` again to start all bots with delay
```bash
ginit
```
4. Press ENTER for every question (it will use your last settings)
5. _[optional]_ Press ENTER on the conflict of ALLPAIRS _(*)_
6. Wait till all bots are started.
7. _[optional]_ If you have changed some configs manually, please copy them from the backup folder back into the gunbot folder:
```bash
cp /opt/gunbot-backup-<NUMBER>/poloniex-BTC_XXX-config.js /opt/gunbot/
```

_(*)_ The conflict could happen if you hav an older version of the generator, because the default settings have changed a bit.
In that case it is very likely you see this question. Just press ENTER:
```
conflict ALLPAIRS-params.js
? Overwrite ALLPAIRS-params.js? (Ynaxdh)
```

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

