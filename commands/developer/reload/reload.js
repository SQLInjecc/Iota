const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
	developer: true,
	extsub: true,
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all commands. DEVELOPER ONLY.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand((options) =>
			options.setName('events').setDescription('Reload events'),
		)
		.addSubcommand((options) =>
			options.setName('commands').setDescription('Reload commands'),
		),
};

