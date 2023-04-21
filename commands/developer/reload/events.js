const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadEvents } = require('../../../handlers/eventloader');

module.exports = {
	subcommand: 'reload.events',
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute(interaction, client) {
		for (const [k, v] of client.events) client.removeListener(`${k}`, v, true);
		loadEvents(client);
		interaction.reply({
			content: 'Reloaded Events',
			ephemeral: true,
		});
	},
};

