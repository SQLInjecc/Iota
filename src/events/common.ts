import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { QuickDB } from "quick.db";

@Discord()
export class Example {
  @On({ event: "guildMemberAdd" })
  async messageDelete([gmember]: ArgsOf<"guildMemberAdd">, client: Client): Promise<void> {
    if (!gmember.user.bot) {
      const uid = gmember.id
      const coins = new QuickDB({
        filePath: 'src/sqlitedb/coins.sqlite'
      })
      if (await coins.get(uid)) {
        console.log('Stats preserved for returning user: ', gmember.displayName)
      }
      else {
			  await coins.set(uid, { coins: 0, jobs: [] });
        console.log('Started user: ', gmember.displayName)
		  }
    }
  }
}
