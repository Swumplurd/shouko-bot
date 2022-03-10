const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Responde con una waifu!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Obtiene la informacion del usuario mencionado')
                .addUserOption(option => option.setName('target').setDescription('Usuario mencionado'))
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('server')
                .setDescription('Obtiene la informacion del servidor')
        ),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            if (user) {
                await interaction.reply(`Usuario: ${user.username}\nId: ${user.id}`);
            } else {
                await interaction.reply(`Usuario: ${interaction.user.username}\nTu id: ${interaction.user.id}`);
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            interaction.reply(`Servidor: ${interaction.guild.name}\nMiembros totales: ${interaction.guild.memberCount}`);
        } else {
            interaction.reply('No se utilizo ningun subcomando');
        }
	},
};
