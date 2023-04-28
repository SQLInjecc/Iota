const { Client, IntentsBitField, Partials, Collection } = require('discord.js');
require('dotenv/config');
const { QuickDB } = require('quick.db');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
	],
	partials: [Partials.User, Partials.Message, Partials.GuildMember, Partials.ThreadMember],
});

const { loadEvents } = require('./handlers/eventloader');

client.events = new Collection();
loadEvents(client);
client.commands = new Collection();
client.subcommands = new Collection();

client.coindb = new QuickDB({ filePath: './sqlitedb/coins.sqlite' });
client.timedb = new QuickDB({ filePath: './sqlitedb/time.sqlite' });

client.login(process.env.TOKEN);