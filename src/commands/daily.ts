import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { QuickDB } from "quick.db";

@Discord()
export class Daily {
	@Slash({description: 'daily'})
	async daily(interaction:CommandInteraction) {
		const coins = new QuickDB({
			filePath: '../sqlitedb/coins.sqlite'
		});
		const timeNeeded = new QuickDB({
			filePath: '../sqlitedb/time.sqlite'
		});
		const uid = interaction.user.id;
		const timeNeededOnDB = await timeNeeded.get(`${uid}.time`);
		if ((new Date().getTime() - timeNeededOnDB) >= 0 || typeof timeNeededOnDB === 'undefined') {
			await coins.add(`${uid}.coins`, 1000);
			await timeNeeded.set(`${uid}.time`, new Date().getTime() + 86400000);
			interaction.reply({
				content: 'Daily bonus of 1000 coins given!'
			});
		}
		else {
			const hours = Math.floor((timeNeededOnDB - new Date().getTime()) / 3600000);
			const minutes = Math.floor(((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000);
			const seconds = Math.floor(((timeNeededOnDB - new Date().getTime()) % 60000) / 1000);
			interaction.reply({
				content: `Wait approx. ${hours} hours, ${minutes} minutes, ${seconds} seconds.`
			});
		}
	}


}