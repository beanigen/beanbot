import {ICommand} from "wokcommands";
import DiscordJS, {
    GuildMember,
    MessageEmbed,
    Interaction, 
    User
} from "discord.js";


export default {
    category: 'Testing',
    description: 'Gets info about the mentioned user.',
    requiredPermissions: ["MANAGE_MESSAGES"],
    slash: true,
    minArgs: 1,
    testOnly: true,
    expectedArgs: '<user>',
    options: [{
        name: 'user',
        description: 'User to get info of',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
    }],
    
    callback: async ({args, message, interaction: msgInt}) => {
        
        const userToGet = message ? message.mentions.members?.first() : msgInt.options.getMember('user') as GuildMember
        //literally unused because minimum arguments is set to one lmfao
        if (!userToGet) {
            return 'Please specify a user to get info of'
        }
        
       
        
        
        const embed = new MessageEmbed()
            .setTitle('Info of ' + userToGet.user.tag)
            .setColor('#FFFF00')
            //this code is absolutely spaghetti, what do you expect from me?
            // .setDescription('Join date: ' + userToGet.joinedAt + '\n Nickname: ' + userToGet.nickname + '\n ID: ' + userToGet.id + '\n Creation date: ' + userToGet.user.createdAt)
            .setDescription(`Join date: ${userToGet.joinedAt} \n Creation date: ${userToGet.user.createdAt} \n Nickname: ${userToGet.nickname} \n ID: ${userToGet.id}`)
            .setThumbnail(userToGet.displayAvatarURL({size: 96, dynamic: true}))
        return embed

    }

    
} as ICommand