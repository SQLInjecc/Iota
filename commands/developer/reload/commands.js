const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadcommands } = require("../../../handlers/commandhandler");

module.exports = {
	subcommand: "reload.commands",
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute(interaction, client) {
        loadcommands(client);
		interaction.reply({
			content: "Reloaded Commands",
			ephemeral: true,
		});
    },
};


