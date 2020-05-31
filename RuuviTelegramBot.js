const ruuvi = require("node-ruuvitag");
const TeleBot = require("telebot");

class RuuviTelegramBot {
	constructor(places, ruuvitags, bot_token) {
		// initialize bot
		let bot = new TeleBot({
			token: bot_token,
			polling: {
				interval: 1000,
				timeout: 0,
				limit: 100,
				retryTimeout: 3000
			}
		});

		// set up listeners: on tag found
		ruuvi.on("found", tag => {
			tag.on("updated", data => {
				if( ruuvitags[tag.id] != undefined ) {
					ruuvitags[tag.id].last_data = data;
				}
				else {
					console.log("Received unrecognized tag: " + JSON.stringify(tag));
				}
			});
		});

		// command available on Telegram
		bot.on(["/start"], (msg) => {
			let response = "Hi! Here there are all available Ruuvitags:\n";

			places.forEach(function (element) {
				response += "/" + element + "\n";
			});

			response += "/all\n";

			msg.reply.text(response);
		});

		places.forEach(function (element) {
			bot.on(["/" + element], (msg) => {
				returnData(msg, retrieveData(element));
			});
		});

		bot.on(["/all"], (msg) => {
			places.forEach(function (element) {
				returnData(msg, retrieveData(element));
			})
		});

		bot.start();

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
				let parseMode = 'html';
				const response = "&#9660; " + ruuvitag.location + " unreachable!";
				return bot.sendMessage(
					msg.from.id, response, {parseMode}
				);
			} else {
				let pressure = data.pressure / 100;

				const response = "&#9660; " + ruuvitag.location + "\n" +

				"&#127777; <strong>" + data.temperature.toFixed(2)  + "°C</strong>\n" +
				"&#128167; " + data.humidity.toFixed(2)  + "%RH\n" +
				"&#127788; " + pressure.toFixed(2)  + "hPa\n" +
				"&#128267; " + data.battery + "mV\n" 

				let parseMode = 'html';
				return bot.sendMessage(
					msg.from.id, response, {parseMode}
				);
			}
		}
	}
}

/* Exports */
module.exports = RuuviTelegramBot;
