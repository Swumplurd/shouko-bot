const { SlashCommandBuilder } = require('@discordjs/builders');
const subredditEmbed = require('../embeds/subredditEmbed');
const reddit = require('reddit.images/src/reddit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('busca un post random en un subreddit!')
        .addStringOption(option =>
            option.setName('subreddit')
            .setDescription('ingresa un subreddit')
            .setRequired(true)
        ),
	async execute(interaction) {
        const subreddit = interaction.options.getString('subreddit');
    
        reddit.FetchSubredditPost({ subreddit: `${subreddit}` }).then((data) => {
            if (data) interaction.reply({embeds: [subredditEmbed(data)]});
            else interaction.reply({content: `no tenemos datos de r/${subreddit} 😕`, ephemeral: true});
        });
	},
};
