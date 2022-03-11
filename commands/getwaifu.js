const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const {sfw, nsfw} = require('../helpers/waifu-categories');
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
                ])
        ),
	async execute(interaction) {
        const category = interaction.options.getString('category');
        const response = await axios.get(`https://api.waifu.pics/${category}/waifu`);
        
        const row = new MessageActionRow();
        if (category === 'sfw') {
                row.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('waifu_type')
                        .setPlaceholder('Selecciona el tipo de waifu.')
                        .addOptions(sfw),
                );
        }
        if (category === 'nsfw') {
                row.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('waifu_type')
                        .setPlaceholder('Selecciona el tipo de waifu.')
                        .addOptions(nsfw),
                );
        }

        try {
            let waifuEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Una waifu salvaje ha aparecido!')
                .setThumbnail('https://raw.githubusercontent.com/Waifu-pics/waifu-api/master/.github/assets/banner.png')
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Regular field title', value: 'Some value here' },
                )
                .setImage(response.data.url)
                .setTimestamp()
                .setFooter({text: 'WAIFU.PICS', iconURL:'https://raw.githubusercontent.com/Waifu-pics/waifu-api/master/.github/assets/banner.png'});

            interaction.reply({components: [row]});
        } catch (error) {
            console.log(error);
        }
	},
};