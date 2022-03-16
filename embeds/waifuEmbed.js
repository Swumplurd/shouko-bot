const { MessageEmbed } = require("discord.js");

const waifuEmbed = (response) => new MessageEmbed()
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

module.exports = waifuEmbed;