const {
	Client,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} = require('discord.js');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('cau')
		.setDescription('Checks user, if not on database, add with 0 coins.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User ID')
				.setRequired(false)),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const db = client.coindb;
		const user = interaction.options.getUser('user') || interaction.user;
		if (user.bot) {
			interaction.reply({
				content: 'Can\'t add a bot!',
			});
		}
		else {
			const uid = user.id;
			if (await db.get(uid)) {
				interaction.reply({
					content: 'Already added.',
					ephemeral: true,
				});
			}
			else {
				await db.set(uid, { coins: 0, jobs: [] });
				interaction.reply({
					content: 'Succesfully added with 0 coins.',
					ephemeral: true,
				});
			}
		}
	},
};

