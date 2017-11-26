const RuuviTelegramBot = require("ruuvitag-telegram-bot");

//my Ruuvitags
const places = ["place1", "place2"];

const Ruuvitags = {
	"<ruuvi_uuid_1>": {
		"uuid": "<ruuvi_uuid_1>",
		"ruuviid": "<your_ruuvi_id>",
		"name": "<your_ruuvi_id>",
		"location": places[0],
		"last_data": ""
	},
	"<ruuvi_uuid_1>": {
		"uuid": "<ruuvi_uuid_1>",
		"ruuviid": "<your_ruuvi_id>",
		"name": "<your_ruuvi_id>",
		"location": places[1],
		"last_data": ""
	}
};

// telegram token
const TELEGRAM_BOT_TOKEN = "<your_bot_token >";

let ruuviTelegramBot = new RuuviTelegramBot(places, Ruuvitags, TELEGRAM_BOT_TOKEN);
