var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { QuickDB } from "quick.db";
let Weekly = class Weekly {
    async weekly(interaction) {
        const coins = new QuickDB({
            filePath: 'src/sqlitedb/coins.sqlite'
        });
        const timeNeeded = new QuickDB({
            filePath: 'src/sqlitedb/time.sqlite'
        });
        ;
        const uid = interaction.user.id;
        const timeNeededOnDB = await timeNeeded.get(`${uid}.timeW`);
        if (new Date().getTime() - timeNeededOnDB >= 0 ||
            typeof timeNeededOnDB === 'undefined') {
            await coins.add(`${uid}.coins`, 1000);
            await timeNeeded.set(`${uid}.timeW`, new Date().getTime() + 86400000 * 7);
            interaction.reply({
                content: 'Weekly bonus of 8000 coins given!'
            });
        }
        else {
            const days = Math.floor((timeNeededOnDB - new Date().getTime()) / 86400000);
            const hours = Math.floor(((timeNeededOnDB - new Date().getTime()) % 86400000) / 3600000);
            const minutes = Math.floor(((timeNeededOnDB - new Date().getTime()) % 3600000) / 60000);
            const seconds = Math.floor(((timeNeededOnDB - new Date().getTime()) % 60000) / 1000);
            interaction.reply({
                content: `Wait approx. ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`
            });
        }
    }
};
__decorate([
    Slash({ description: 'weekly' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", Promise)
], Weekly.prototype, "weekly", null);
Weekly = __decorate([
    Discord()
], Weekly);
export { Weekly };