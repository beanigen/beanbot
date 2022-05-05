import {ICommand} from "wokcommands";
import DiscordJS, {
    Interaction,
    MessageActionRow,
    MessageButton,
    GuildMember
} from "discord.js";

export default {
    category: 'Moderation',
    description: 'Bans a user',
    requiredPermissions: ["BAN_MEMBERS"],
    slash: true,
    testOnly: true,
    minArgs: 1,
    expectedArgs: '<user> <reason>',
    options: [{
        name: 'member',
        description: 'The mention of the user to ban',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
    },
        {
            name: 'reason',
            description: 'Reason for ban',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        }],
    
    
    callback: async ({ args , message, interaction: msgInt, channel }) => {
        // const userToBan = args[0]
        const userToBan = message ? message.mentions.members?.first() : msgInt.options.getMember('member') as GuildMember
        if (!userToBan) {
            return 'Please mention someone to ban.'
        }
        
        if (!userToBan.bannable) {
            return 'Cannot ban user!'
        }
        
        args.shift()
        const reason = args.join(' ')
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )
        
        await msgInt.reply({
            content: 'Are you sure?',
            components: [row],
            ephemeral: false
        })
        
        const filter = (btnInt: Interaction) => {
            return  msgInt.user.id === btnInt.user.id
        }
        
        
        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })
        
        
        
        collector.on('end', async (collection) =>{
            collection.forEach((click) => {
                console.log(click.user.id, click.customId, userToBan)
            })
            
            if (collection.first()?.customId === 'ban_yes') {
                // ban the target user
                userToBan.ban({
                    reason,
                    days: 1
                    
                })
            }
            
            await msgInt.editReply({
                content: `Member ${userToBan} has been banned.`,
                components: [],
                
            })
        })
    }
} as ICommand