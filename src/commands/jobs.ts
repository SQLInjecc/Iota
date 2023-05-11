import { EmbedBuilder } from '@discordjs/builders';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { QuickDB } from 'quick.db';

@Discord()
@SlashGroup({ description: 'Job parts', name: 'jobs' })
@SlashGroup('jobs')
export class jobs {
	@Slash({ description: 'list' })
	list(interaction: CommandInteraction) {
		const jobs = [
			["Throwin' Cookies chef", 10, 0, 'tcc'],
			['98 Eats employee', 20, 5, '9ee'],
			['Foobar driver', 40, 10, 'fbd'],
			['Developer', 100, 25, 'dev']
		];
		const embed = new EmbedBuilder().setColor(0x2b2d31).setTitle('Jobs');
		for (let i = 0; i < jobs.length; i++) {
			embed.addFields({
				name: jobs[i][0].toString(),
				value: `\`\`\`$${jobs[i][1]}/hour\nRequirements: ${
					jobs[i][2] == 0 ? 'None' : `Worked ${jobs[i][2]}`
				}\nID: ${jobs[i][3]}\`\`\``
			});
		}
		interaction.reply({
			embeds: [embed]
		});
	}

	@Slash({ description: 'work' })
	async work(interaction: CommandInteraction) {
		const uid = interaction.user.id;
		const coins = new QuickDB({
			filePath: '../sqlitedb/coins.sqlite'
		});
		const timeNeededOnDB = await coins.get(`${uid}.jobs.time`);
		const tworked = (await coins.get(`${uid}.jobs.timesworked`)) + 1;
		// cash per hour
		const cph = await coins.get(`${uid}.jobs.cph`);
		if (!cph) {
			interaction.reply({
				content: 'Unemployed.'
			});
		} else if (
			new Date().getTime() - timeNeededOnDB >= 0 ||
			typeof timeNeededOnDB === 'undefined'
		) {
			await coins.add(`${uid}.coins`, 6 * cph);
			await coins.set(
				`${uid}.jobs.time`,
				new Date().getTime() + 43200000
			);
			interaction.reply({
				content: `Worked 6 hours! Earned $${6 * cph}`
			});
			await coins.set(`${uid}.jobs.timesworked`, tworked);
		} else {
			const hours = Math.floor(
				(timeNeededOnDB - new Date().getTime()) / 3600000
			);
			const minutes = Math.floor(
				((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000
			);
			const seconds = Math.floor(
				((timeNeededOnDB - new Date().getTime()) % 60000) / 1000
			);
			interaction.reply({
				content: `Wait approx. ${hours} hours, ${minutes} minutes, ${seconds} seconds.`
			});
		}
	}

	@Slash({ description: 'apply' })
	async execute(interaction: CommandInteraction,
			@SlashOption({
				description: 'job to apply',
				name: 'job',
				required: true,
				type: ApplicationCommandOptionType.String
			})jta: 'tcc' | '9ee' | 'fbd' | 'dev' // job to apply
		) {
		const uid = interaction.user.id;
		const jobs = [
			["Throwin' Cookies chef", 10, 0, 'tcc'],
			['98 Eats employee', 20, 5, '9ee'],
			['Foobar driver', 40, 10, 'fbd'],
			['Developer', 100, 25, 'dev']
		];
		const db = new QuickDB({
			filePath: '../sqlitedb/coins.sqlite'
		});
		const tworked = await db.get(`${uid}.jobs.timesworked`);
		for (let i = 0; i < jobs.length; i++) {
			if (jobs[i][3] == jta &&
				tworked >= jobs[i][2]) {
				await db.set(`${uid}.jobs.cph`, jobs[i][1]);
				interaction.reply({
					content: `Now working as ${jobs[i][0]}`
				});
				break;
			}
		}
	}
}







