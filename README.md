# RuuviTelegramBot
Node.js module for reading data from a [Ruuvitag](http://tag.ruuvi.com) weather station and retrieve
them through Telegram Bot.

Tested on Raspberry Pi 3. 
Depends on [node-ruuvitag](https://github.com/Espesen/node-ruuvitag) and [telebot](https://github.com/mullwar/telebot). 

### Installation

```
npm i ruuvitag-telegram-bot
```

### Usage example
```
const RuuviTelegramBot = require("./RuuviTelegramBot");

//my Ruuvitags
const places = ["place1", "place2"];

const Ruuvitags = {
	<ruuvi_uuid_1>: {
		"uuid": <ruuvi_uuid_1>,
		"ruuviid": <your_ruuvi_id>,
		"name": <your_ruuvi_id>,
		"location": places[0],
		"last_data": ""
	},
	<ruuvi_uuid_1>: {
		"uuid": <ruuvi_uuid_1>,
		"ruuviid": <your_ruuvi_id>,
		"name": <your_ruuvi_id>,
		"location": places[1],
		"last_data": ""
	}
};

// telegram token
const TELEGRAM_BOT_TOKEN = <your_bot_token>;

let ruuviTelegramBot = new RuuviTelegramBot(places, Ruuvitags, TELEGRAM_BOT_TOKEN);
```

You need to substitute all variable inside <>.

Developed by Francesco Longo (france193).
