const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	Client,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Get your daily reward'),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const coins = client.coindb;
		const timeNeeded = client.timedb;
		const uid = interaction.member.id;
		const timeNeededOnDB = await timeNeeded.get(`${uid}.time`);
		if ((new Date().getTime() - timeNeededOnDB) >= 0 || typeof timeNeededOnDB === 'undefined') {
			await coins.add(`${uid}.coins`, 1000);
			await timeNeeded.set(`${uid}.time`, new Date().getTime() + 86400000);
			interaction.reply({
				content: 'Daily bonus of 1000 coins given!',
			});
		}
		else {
			const hours = Math.floor((timeNeededOnDB - new Date().getTime()) / 3600000);
			const minutes = Math.floor(((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000);
			const seconds = Math.floor(((timeNeededOnDB - new Date().getTime()) % 60000) / 1000);
			interaction.reply({
				content: `Wait approx. ${hours} hours, ${minutes} minutes, ${seconds} seconds.`,
			});
		}
	},
};

