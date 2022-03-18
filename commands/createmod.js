const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createmod')
        .setDescription('crea el rol mod'),
    async execute(interaction) {
        if (interaction.guild.roles.cache.some(role => role.name === 'mod')) {
			return interaction.reply('el rol "mod" ya ha sido creado');
		}

		interaction.guild.roles.create({ name: 'mod', permissions: [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.KICK_MEMBERS] })
			.then(() => interaction.reply('rol mod creado'))
			.catch(console.error);
    },
};
