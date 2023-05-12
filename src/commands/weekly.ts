import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { QuickDB } from "quick.db";

@Discord()
export class Weekly {
	@Slash({ description: 'weekly' })
	async weekly(interaction:CommandInteraction) {
		const coins = new QuickDB({
			filePath: 'src/sqlitedb/coins.sqlite'
		});
		const timeNeeded = new QuickDB({
			filePath: 'src/sqlitedb/time.sqlite'
		});;
		const uid = interaction.user.id;
		const timeNeededOnDB = await timeNeeded.get(`${uid}.timeW`);
		if (
			new Date().getTime() - timeNeededOnDB >= 0 ||
			typeof timeNeededOnDB === 'undefined'
		) {
			await coins.add(`${uid}.coins`, 1000);
			await timeNeeded.set(
				`${uid}.timeW`,
				new Date().getTime() + 86400000 * 7
			);
			interaction.reply({
				content: 'Weekly bonus of 8000 coins given!'
			});
		} else {
			const days = Math.floor(
				(timeNeededOnDB - new Date().getTime()) / 86400000
			);
			const hours = Math.floor(
				((timeNeededOnDB - new Date().getTime()) % 86400000) / 3600000
			);
			const minutes = Math.floor(
				((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000
			);
			const seconds = Math.floor(
				((timeNeededOnDB - new Date().getTime()) % 60000) / 1000
			);
			interaction.reply({
				content: `Wait approx. ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`
			});
		}
	}




}