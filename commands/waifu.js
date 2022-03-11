const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const {sfw, nsfw} = require('../helpers/waifu-categories');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Responde con una waifu!')
        .addStringOption(option =>
            option
                .setName('category')
                .setDescription('Elige una categoria!')
                .setRequired(true)
                .addChoices([
                    [
                        'sfw', 'sfw'
                    ],
                    [
                        'nsfw', 'nsfw'
                    ]
                ])
        ),
	async execute(interaction) {
        const category = interaction.options.getString('category');
        
        const row = new MessageActionRow();
        if (category === 'sfw') {
                row.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('sfw')
                        .setPlaceholder('Selecciona el tipo de waifu.')
                        .addOptions(sfw),
                );
        }
        if (category === 'nsfw') {
                row.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('nsfw')
                        .setPlaceholder('Selecciona el tipo de waifu.')
                        .addOptions(nsfw),
                );
        }

        try {
            interaction.reply({components: [row]});
        } catch (error) {
            console.log(error);
        }
	},
};