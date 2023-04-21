const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 */
	execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) {
			return interaction.reply({
				content: 'No command found.',
				ephemeral: true,
			});
		}

		if (command.developer && interaction.user.id !== '996465294170128394') {
			return interaction.reply({
				content: 'Only for the Developer.',
				ephemeral: true,
			});
		}

		const subcommand = interaction.options.getSubcommand(false);
		if (subcommand && command.extsub) {
			const subcommandfile = client.subcommands.get(
				`${interaction.commandName}.${subcommand}`,
			);
			if (!subcommandfile) {
				return interaction.reply({
					content: 'No subcommand found.',
					ephemeral: true,
				});
			}
			subcommandfile.execute(interaction, client);
		}
		else {command.execute(interaction, client);}
	},
};

