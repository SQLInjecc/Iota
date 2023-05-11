import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class Ping {
  @Slash({ description: "ping" })
  ping(interaction: CommandInteraction): void {
    interaction.reply(`${interaction.client.ws.ping} ms`);
  }
}
