const { SlashCommandBuilder } = require('@discordjs/builders');
const { sfwChoices, nsfwChoices } = require('../helpers/waifu-categories');
const waifuEmbed = require('../embeds/waifuEmbed');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('responde con una waifu!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('sfw')
                .setDescription('safe for work waifu')
                .addStringOption(option => 
                    option.setName('type')
                    .setDescription('tipo de waifu')
                    .setRequired(true)
                    .addChoices(sfwChoices)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('nsfw')
                .setDescription('not safe for work waifu')
                .addStringOption(option => 
                    option.setName('type')
                    .setDescription('tipo de waifu')
                    .setRequired(true)
                    .addChoices(nsfwChoices)
                )
        ),
	async execute(interaction) {
        const category = interaction.options.getSubcommand();
        const type = interaction.options.getString('type');
        const response = await axios.get(`https://api.waifu.pics/${category}/${type}`);

        interaction.reply({embeds: [waifuEmbed(response)]});
	},
};