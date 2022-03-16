const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('borra mensajes de un usuario')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('numero de mensajes a borrar')
            .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'mod')) {
            const amount = interaction.options.getInteger('amount');
    
            if (amount < 1 || amount > 100) {
                return interaction.reply({ content: 'ingresa un numero entre 1 y 100', ephemeral: true });
            }

            await interaction.channel.bulkDelete(amount, true).catch(error => {
                console.error(error);
                interaction.reply({ content: 'hubo un error al eliminar mensajes en el servidor!', ephemeral: true });
            });
            
            interaction.reply({content: 'mensajes eliminados', ephemeral: true})
        } else {
            interaction.reply({content: 'no tienes permisos para ejecutar este comando', ephemeral: true})
        }
    },
};