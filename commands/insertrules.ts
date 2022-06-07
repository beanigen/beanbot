import {ICommand} from "wokcommands";
import DiscordJS, {
    MessageEmbed,
    TextChannel

} from "discord.js";

const ruleFile = require("./rules.json")
// JSON.parse(require("./rules.json"))

// noinspection JSUnusedGlobalSymbols
export default {
    category: 'Moderation',
    description: 'Sends rules as an embed to a specified channel.',
    slash: true,
    testOnly: true,
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channelForRules>',
    options: [
        {
        name: 'channel',
        description: 'The channel to put rules in',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL
    }],

    callback: async ({args, client}) => {
        const rulesChannelID = args[0]
        const rulesToPrint = ruleFile
        console.log(rulesChannelID)
        const rulesEmbed = new MessageEmbed(rulesToPrint)
        const rulesChannel = (client.channels.cache.get(rulesChannelID) as TextChannel)
        await rulesChannel.send({embeds: [rulesEmbed]})
        return 'Message sent successfully!'
       
      
        
        

        
       


    }
} as ICommand