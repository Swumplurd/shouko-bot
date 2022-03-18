const { MessageEmbed } = require("discord.js");

const subredditEmbed = (data) => new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Post random de r/${data.subreddit}`)
    .setURL(`${data.postLink}`)
    .addFields(
        { name: 'Titulo', value: `${data.title}` },
        { name: 'Upvotes', value: `${data.upvotes}`, inline: true },
        { name: 'Downvotes', value: `${data.downvotes}`, inline: true },
    )
    .setImage(data.gallery ? data.image[0] : data.image)
    .setTimestamp()
    .setFooter({text: `${data.author}`, iconURL:'https://camo.githubusercontent.com/18c6ac75036ef1f3c6d3c9cd6edcf6eb17a9ae02b19cb8bbf318d160547e32a4/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3738343730333537353439303136363739342f3738393732333030393837353331323638312f69636f6e73382d7265646469742d323034382e706e67'});

module.exports = subredditEmbed;