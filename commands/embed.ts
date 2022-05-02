import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Testing',
    description: 'Sends an embed',

    permissions: ['ADMINISTRATOR'],

    callback: ({message, text}) => {
        const embed = new MessageEmbed()
            .setDescription("Hello World")
            .setTitle('Title')
            .setColor('PURPLE')
            .setAuthor('bean')
            .setFooter('footer')
            .addFields([{
                name: 'name',
                value: 'value'
            },
                {
                    name: 'name2',
                    value: 'value2'
                }])
        return embed
    }
} as ICommand