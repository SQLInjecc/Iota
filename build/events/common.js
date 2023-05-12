var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Discord, On } from "discordx";
import { QuickDB } from "quick.db";
let Example = class Example {
    async messageDelete([gmember], client) {
        if (!gmember.user.bot) {
            const uid = gmember.id;
            const coins = new QuickDB({
                filePath: 'src/sqlitedb/coins.sqlite'
            });
            if (await coins.get(uid)) {
                console.log('Stats preserved for returning user: ', gmember.displayName);
            }
            else {
                await coins.set(uid, { coins: 0, jobs: [] });
                console.log('Started user: ', gmember.displayName);
            }
        }
    }
};
__decorate([
    On({ event: "guildMemberAdd" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], Example.prototype, "messageDelete", null);
Example = __decorate([
    Discord()
], Example);
export { Example };
