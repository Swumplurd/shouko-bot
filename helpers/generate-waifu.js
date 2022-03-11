const { MessageEmbed } = require("discord.js");
const axios = require('axios').default;


const generateWaifu = async(interaction, value) => {
    const response = await axios.get(`https://api.waifu.pics/${interaction.customId}/${value}`);
    let waifuEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Una waifu salvaje ha aparecido!')
                .setThumbnail('https://raw.githubusercontent.com/Waifu-pics/waifu-api/master/.github/assets/banner.png')
                /* .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Regular field title', value: 'Some value here' },
                ) */
                .setImage(response.data.url)
                .setTimestamp()
                .setFooter({text: 'WAIFU.PICS', iconURL:'https://raw.githubusercontent.com/Waifu-pics/waifu-api/master/.github/assets/banner.png'});

    try {
		await interaction.update({ embeds: [waifuEmbed], components: [] });
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Hubo un error seleccionando!', ephemeral: true });
	}
}

module.exports = generateWaifu;