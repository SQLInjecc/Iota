import { EmbedBuilder } from '@discordjs/builders';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { QuickDB } from 'quick.db';

@Discord()
@SlashGroup({ description: 'Job parts', name: 'jobs' })
@SlashGroup('jobs')
export class jobs {
	@Slash({ description: 'list' })
	list(interaction: CommandInteraction) {
		const jobs = [
			["Throwin' Cookies chef", 10, 0],
			['98 Eats employee', 20, 5],
			['Foobar driver', 40, 10],
			['Developer', 100, 25]
		];
		const embed = new EmbedBuilder().setColor(0x2b2d31).setTitle('Jobs');
		for (let i = 0; i < jobs.length; i++) {
			embed.addFields({
				name: jobs[i][0].toString(),
				value: `\`\`\`$${jobs[i][1]}/hour\nRequirements: ${
					jobs[i][2] == 0 ? 'None' : `Worked ${jobs[i][2]}`
				}\`\`\``
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
			filePath: 'src/sqlitedb/coins.sqlite'
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
			await coins.add(`${uid}.jobs.timesworked`, 1);
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
	async apply(
		@SlashOption({
			description: 'job to apply',
			name: 'job',
			required: true,
			type: ApplicationCommandOptionType.String
		})
		@SlashChoice({
			name: "Throwin' Cookies chef",
			value: "Throwin' Cookies chef"
		})
		@SlashChoice({ name: '98 Eats employee', value: '98 Eats employee' })
		@SlashChoice({ name: 'Foobar driver', value: 'Foobar driver' })
		@SlashChoice({ name: 'Developer', value: 'Developer' })
		jta: String, // job to apply
		interaction: CommandInteraction
	) {
		const uid = interaction.user.id;
		const jobs = [
			["Throwin' Cookies chef", 10, 0],
			['98 Eats employee', 20, 5],
			['Foobar driver', 40, 10],
			['Developer', 100, 25]
		];
		const db = new QuickDB({
			filePath: 'src/sqlitedb/coins.sqlite'
		});
		const tworked = await db.get(`${uid}.jobs.timesworked`);
		for (let i = 0; i < jobs.length; i++) {
			if (jobs[i][1] == (await db.get(`${uid}.jobs.cph`))) {
				interaction.reply({
					content: "Already working as that"
				});
				break;
			}
			if (
				tworked < jobs[i][2] &&
				!interaction.replied
			) {
				interaction.reply({
					content: "Not qualified yet"
				});
				break;
			}
			await db.set(`${uid}.jobs.cph`, jobs[i][1]);
			interaction.reply({
				content: `Now working as ${jobs[i][0]}`
			});
			break;
		}
	}
}
