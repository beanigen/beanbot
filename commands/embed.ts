import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Testing',
    description: 'Sends an embed',
    slash: true,
    permissions: ['ADMINISTRATOR'],

    callback: async ({message, text}) => {

        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed
        // const embed = new MessageEmbed()
        //     .setDescription("Hello World")
        //     .setTitle('Test embed')
        //     .setColor('PURPLE')
        //     .setAuthor('bean')
        //     .setFooter('footer')
        //     .addFields([{
        //         name: 'name1',
        //         value: 'value1'
        //     },
        //         {
        //             name: 'name2',
        //             value: 'value2'
        //         }])
        // const newMessage = await message.reply({
        //     embeds: [embed]
        // })
        //
        // await new Promise(resolve => setTimeout(resolve, 5000))
        //
        // const newEmbed = newMessage.embeds[0];
        // newEmbed.setTitle('Edited Title')
        // newMessage.edit({
        //     embeds: [newEmbed]
        // })


    },
} as ICommand