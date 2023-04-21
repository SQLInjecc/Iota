const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	Client,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Answers with bot's latency"),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute(interaction, client) {
		interaction.reply({
			content: `${client.ws.ping} ms`,
			ephemeral: true,
		});
	},
};

