import { createBot, Bot, BotOptions } from 'mineflayer';
import { plugin as AutoEat } from 'mineflayer-auto-eat';

import { NoChatReports } from './modules';
import { expressions } from './expressions';
import { env } from './environment';

function registerEvents(bot: Bot, config: BotOptions) {
	bot.loadPlugin(AutoEat)
	bot.loadPlugin(NoChatReports)

	bot.once('spawn', () => {
		console.log(`Connected to server ${env.SERVER_IP}:${env.SERVER_PORT}...`);

		bot.autoEat.options = {
			priority: 'foodPoints',
			startAt: 19,
			bannedFood: [],
			eatingTimeout: 2,
			ignoreInventoryCheck: true,
			checkOnItemPickup: true,
			offhand: true,
			equipOldItem: true
		}
	});

	bot.on('error', (err) => {
		console.error(err);
	});

	bot.on('death', () => {
		bot.chat('I died :(');
	});

	bot.on('end', (reason) => {
		console.log(`Kicked from server: ${reason}`);

		setTimeout(() => {
			bot = createBot(config);
			registerEvents(bot, config)
		}, 5000);
	});

	bot.on('chat', (username, message) => {
		console.log(`[${username}] ${message}`);

		for (const [regex, handler] of expressions) {
			if (regex.test(message)) {
				handler(bot, message);
				break;
			}
		}
	});

	bot.on('whisper', (username, message) => {
		const allowedUsers = ['DownloadableFox', 'huorn'];

		if (allowedUsers.includes(username)) {
			bot.chat(message);
		}
	});

	bot.on('health', () => {
		if ( bot.food === 20) bot.autoEat.disable();
		bot.autoEat.enable();
	});

	bot.on('entityMoved', (entity) => {
		const closestPlayer = Object.entries(bot.players)
			.filter(([, player]) => player.username !== bot.username && player.entity)
			.filter(([, player]) => player.entity?.position?.distanceTo(bot.entity.position) < 5)
			.sort(([, a], [, b]) => bot.entity?.position.distanceTo(a.entity.position) - bot.entity?.position.distanceTo(b.entity.position))
			.shift();

		if (!closestPlayer) return;
		bot.lookAt(closestPlayer[1].entity.position.offset(0, 1, 0));
	});
}

async function main() {
	const config: BotOptions = {
		// Auth settings
		host: env.SERVER_IP,
		port: env.SERVER_PORT,
		username: env.MC_USERNAME,
		password: env.MC_PASSWORD ?? undefined,
		auth: env.MC_AUTH as any,

		// Client settings
		respawn: true,
	};

	const bot = createBot(config);
	registerEvents(bot, config);
}

main().catch(console.error);