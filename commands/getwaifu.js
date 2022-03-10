const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, ClientVoiceManager } = require("discord.js");
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getwaifu')
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
                ]
            )),
	async execute(interaction) {
        const category = interaction.options.getString('category');
        const response = await axios.get(`https://api.waifu.pics/${category}/waifu`);
            try {
                let waifuEmbed = new MessageEmbed()
                    .setImage(response.data.url)
                    interaction.reply({embeds: [waifuEmbed]});
            } catch (error) {
                console.log(error)
            }
	},
};