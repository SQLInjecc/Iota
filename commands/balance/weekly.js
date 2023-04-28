const {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	Client,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weekly')
		.setDescription('Get your weekly reward'),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const coins = client.coindb;
		const timeNeeded = client.timedb;
		const uid = interaction.member.id;
		const timeNeededOnDB = await timeNeeded.get(`${uid}.timeW`);
		if ((new Date().getTime() - timeNeededOnDB) >= 0 || typeof timeNeededOnDB === 'undefined') {
			await coins.add(`${uid}.coins`, 1000);
			await timeNeeded.set(`${uid}.timeW`, new Date().getTime() + (86400000 * 7));
			interaction.reply({
				content: 'Weekly bonus of 8000 coins given!',
			});
		}
		else {
			const days = Math.floor((timeNeededOnDB - new Date().getTime()) / 86400000);
			const hours = Math.floor(((timeNeededOnDB - new Date().getTime()) % 86400000) / 3600000);
			const minutes = Math.floor(((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000);
			const seconds = Math.floor(((timeNeededOnDB - new Date().getTime()) % 60000) / 1000);
			interaction.reply({
				content: `Wait approx. ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`,
			});
		}
	},
};

