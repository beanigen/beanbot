import {ICommand} from "wokcommands";
import DiscordJS, {
    GuildMember
} from "discord.js";

export default {
    category: 'Moderation',
    description: 'Kicks a user.',
    slash: true,
    permissions: ['KICK_MEMBERS'],
    minArgs: 1,
    expectedArgs: '<user>',
    options: [
        {
            name: 'user',
            description: 'Member to kick.',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
        },
        {
            name: 'reason',
            description: 'Reason for kick.',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: ({ interaction, args }) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'Please mention someone to kick.'
        }
        
        if (!target.kickable) {
            return 'Unable to kick member.'
        }
        
        args.shift()
        const reason = args.join(' ')
        
        target.kick(reason)
        return `Successfully kicked ${target}`
        
        
    }
} as ICommand