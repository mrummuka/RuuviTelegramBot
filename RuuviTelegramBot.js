const ruuvi = require("node-ruuvitag");
const TeleBot = require("telebot");

class RuuviTelegramBot {
	constructor(places, ruuvitags, bot_token) {
		let all = "all_available_ruuvitags";

		// initialize bot
		this.bot = new TeleBot({
			token: bot_token,
			polling: {
				interval: 1000,
				timeout: 0,
				limit: 100,
				retryTimeout: 3000,
			},
		});

		// set up listeners: on tag found
		ruuvi.on("found", tag => {
			tag.on("updated", data => {
				ruuvitags[tag.id].last_data = data;
			});
		});

		// command available on Telegram
		this.bot.on([all], (msg) => {
			let response = "Hi! Here there are all available Ruuvitags:\n";

			places.forEach(function (element) {
				response += "/" + element + "\n";
			});

			response += all + "\n";

			msg.reply.text(response);
		});

		places.forEach(function (element) {
			this.bot.on(["/" + element], (msg) => {
				returnData(msg, retrieveData(element));
			});
		});

		this.bot.on([all], (msg) => {
			places.forEach(function (element) {
				returnData(msg, retrieveData(element));
			})
		});

		function retrieveData(place) {
			for (let key in ruuvitags) {
				let ruuvitag = ruuvitags[key];

				if (ruuvitag.location === place) {
					return ruuvitag;
				}
			}
			return null;
		}

		function returnData(msg, ruuvitag) {
			let data = ruuvitag.last_data;

			if (!data) {
				msg.reply.text("Not connected!");
			} else {
				let battery;

				if (data.battery > 3000) {
					battery = 100;
				} else {
					battery = (3000 / data.battery) * 100;
				}

				let pressure = data.pressure / 100;

				const response = " > Ruuvitag (" + ruuvitag.ruuviid + ") @ " + ruuvitag.location + "\n" +
					" * Humidity:    " + data.humidity + "% RH\n" +
					" * Pressure:    " + pressure + " hPa\n" +
					" * Temperature: " + data.temperature + " C° \n" +
					" * Battery:     " + battery + "% \n";

				msg.reply.text(response);
			}
		}
	}

	start() {
		// start bot
		this.bot.start();
	}
}

/* Exports */
module.exports = RuuviTelegramBot;