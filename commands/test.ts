import {ICommand} from "wokcommands";
import {ButtonInteraction, Collection, MessageActionRow, MessageButton} from "discord.js";

export default {
    category: 'Testing',
    description: 'Testing',
    
    slash: true,
    testOnly: true,
    
    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('PRIMARY')
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
            ephemeral: true
        })
        
        const filter = (btnInt: ButtonInteraction) => {
            return msgInt.id === btnInt.user.id
        }
        
        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 15000
        })
        
        collector.on('collect', (i: ButtonInteraction) => {
            i.reply({
                ephemeral: true,
                content: 'You clicked a button'
            })
        })
               
        collector.on('end', (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })
        })
    }
} as ICommand