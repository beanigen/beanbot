import {ICommand} from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with pong.',

    slash: true,
    testOnly: true,

    callback: ({}) => {
        return 'Pong'
    },
} as ICommand