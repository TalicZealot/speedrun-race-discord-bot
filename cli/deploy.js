const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'deploy',
    async execute(client, race) {
        const data = [{
                name: 'start',
                description: 'Starts a new race with the selected options.',
                options: [{
                        name: 'category',
                        type: 'STRING',
                        description: 'Category of the race.',
                        required: true,
                        choices: [
                            {
                                name: 'Guarded OG',
                                value: 'Guarded-OG',
                            },
                            {
                                name: 'Safe',
                                value: 'Safe',
                            },
                            {
                                name: 'Casual',
                                value: 'Casual',
                            },
                            {
                                name: 'Nimble',
                                value: 'Nimble',
                            },
                            {
                                name: 'Lycanthrope',
                                value: 'Lycanthrope',
                            },
                            {
                                name: 'Expedition',
                                value: 'Expedition',
                            },
                            {
                                name: 'Warlock',
                                value: 'Warlock',
                            },
                            {
                                name: 'Adventure',
                                value: 'Adventure',
                            },
                            {
                                name: 'OG',
                                value: 'OG',
                            },
                            {
                                name: 'Speedrun',
                                value: 'Speedrun',
                            },
                            {
                                name: 'Bat master',
                                value: 'Bat-master',
                            },
                            {
                                name: 'Custom',
                                value: 'Custom',
                            },
                        ]
                    },
                    {
                        name: 'ranked',
                        type: 'BOOLEAN',
                        description: 'ranked',
                        required: false
                    },
                    {
                        name: 'tournament',
                        type: 'BOOLEAN',
                        description: 'tournament',
                        required: false
                    },
                    {
                        name: 'platform',
                        type: 'STRING',
                        description: 'platform',
                        required: false,
                        choices: [{
                                name: 'playstation',
                                value: 'playstation',
                            },
                            {
                                name: 'xbla',
                                value: 'xbla',
                            },
                            {
                                name: 'saturn',
                                value: 'saturn',
                            },
                            {
                                name: 'requiem',
                                value: 'requiem',
                            },
                        ]
                    }
                ]
            },
            {
                name: 'setseed',
                description: 'Submit a custom seed for the current randomzier race.',
                options: [{
                    name: 'seed',
                    type: 'STRING',
                    description: 'Link to the seed.',
                    required: true
                }]
            },
            {
                name: 'stats',
                description: 'Outputs summarized race stats for the selected category or user.',
                options: [{
                        name: 'category',
                        type: 'STRING',
                        description: 'Category of the race.',
                        required: false,
                        choices: [{
                            name: 'Guarded OG',
                            value: 'Guarded-OG',
                        },
                        {
                            name: 'Safe',
                            value: 'Safe',
                        },
                        {
                            name: 'Casual',
                            value: 'Casual',
                        },
                        {
                            name: 'Nimble',
                            value: 'Nimble',
                        },
                        {
                            name: 'Lycanthrope',
                            value: 'Lycanthrope',
                        },
                        {
                            name: 'Expedition',
                            value: 'Expedition',
                        },
                        {
                            name: 'Warlock',
                            value: 'Warlock',
                        },
                        {
                            name: 'Adventure',
                            value: 'Adventure',
                        },
                        {
                            name: 'OG',
                            value: 'OG',
                        },
                        {
                            name: 'Speedrun',
                            value: 'Speedrun',
                        },
                        {
                            name: 'Bat master',
                            value: 'Bat-master',
                        }
                        ]
                    },
                    {
                        name: 'user',
                        type: 'USER',
                        description: 'user',
                        required: false
                    },
                    {
                        name: 'public',
                        type: 'BOOLEAN',
                        description: 'Select true if you want the reply to be visible to everybody.',
                        required: false
                    }
                ]
            },
            {
                name: 'pager',
                description: 'Gives or removes the RacePager role.'
            },
            {
                name: 'stream',
                description: `Sets a stream link for the user's profile.`,
                options: [{
                    name: 'stream',
                    type: 'STRING',
                    description: `Link to the user's stream.`,
                    required: true
                }]
            },
            {
                name: 'close',
                description: 'Closes the current race.'
            },
            {
                name: 'restart',
                description: 'Restarts the current race.'
            },
            {
                name: 'kick',
                description: 'Removes a user from the race without a result.',
                options: [{
                    name: 'user',
                    type: 'USER',
                    description: 'user',
                    required: true
                }]
            },
            {
                name: 'lock',
                description: 'Turns on auto mute for the race voice channel for joining users.'
            },
            {
                name: 'unlock',
                description: 'Turns off auto mute for the race voice channel.'
            },
            {
                name: 'submit',
                description: 'Submit a race result.',
                options: [{
                        name: 'category',
                        type: 'STRING',
                        description: 'Category of the race.',
                        required: true,
                        choices: [{
                            name: 'Guarded OG',
                            value: 'Guarded-OG',
                        },
                        {
                            name: 'Safe',
                            value: 'Safe',
                        },
                        {
                            name: 'Casual',
                            value: 'Casual',
                        },
                        {
                            name: 'Nimble',
                            value: 'Nimble',
                        },
                        {
                            name: 'Lycanthrope',
                            value: 'Lycanthrope',
                        },
                        {
                            name: 'Expedition',
                            value: 'Expedition',
                        },
                        {
                            name: 'Warlock',
                            value: 'Warlock',
                        },
                        {
                            name: 'Adventure',
                            value: 'Adventure',
                        },
                        {
                            name: 'OG',
                            value: 'OG',
                        },
                        {
                            name: 'Speedrun',
                            value: 'Speedrun',
                        },
                        {
                            name: 'Bat master',
                            value: 'Bat-master',
                        }
                        ]
                    },
                    {
                        name: 'player1',
                        type: 'USER',
                        description: 'The player that finished in first place.',
                        required: true
                    },
                    {
                        name: 'player2',
                        type: 'USER',
                        description: 'The player that finished in second place.',
                        required: true
                    },
                    {
                        name: 'player2forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player3',
                        type: 'USER',
                        description: 'The player that finished in third place.',
                        required: false
                    },
                    {
                        name: 'player3forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player4',
                        type: 'USER',
                        description: 'The player that finished in fourth place.',
                        required: false
                    },
                    {
                        name: 'player4forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player5',
                        type: 'USER',
                        description: 'The player that finished in fifth place.',
                        required: false
                    },
                    {
                        name: 'player5forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player6',
                        type: 'USER',
                        description: 'The player that finished in sixth place.',
                        required: false
                    },
                    {
                        name: 'player6forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player7',
                        type: 'USER',
                        description: 'The player that finished in seventh place.',
                        required: false
                    },
                    {
                        name: 'player7forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player8',
                        type: 'USER',
                        description: 'The player that finished in eighth place.',
                        required: false
                    },
                    {
                        name: 'player8forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player9',
                        type: 'USER',
                        description: 'The player that finished in ninth place.',
                        required: false
                    },
                    {
                        name: 'player9forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                    {
                        name: 'player10',
                        type: 'USER',
                        description: 'The player that finished in tenth place.',
                        required: false
                    },
                    {
                        name: 'player10forfeit',
                        type: 'BOOLEAN',
                        description: 'True if the player forfeited.',
                        required: false
                    },
                ]
            },
        ];

        const command = await client.guilds.cache.first(1)[0]?.commands.set(data);
        console.log(command);
        //const command = await client.application?.commands.set(data);
    }
};