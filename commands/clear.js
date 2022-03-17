const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('borra mensajes de un usuario')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('numero de mensajes a borrar')
            .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
            .setDescription('ingresa un usuario')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        if (interaction.member.roles.cache.some(role => role.name === 'mod')) {
            if (amount < 1 || amount > 100) {
                return interaction.reply({ content: 'ingresa un numero entre 1 y 100', ephemeral: true });
            }

            if (user) {
                interaction.channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    const userMessages = [];
                    messages.filter(m => m.author.id === user.id).forEach(msg => {
                        userMessages.push(msg)
                        if (userMessages.length === amount) {
                            interaction.channel.bulkDelete(userMessages).then(() => {
                                return interaction.reply({ content: `se borraron los mensajes de ${user.username}`, ephemeral: true })
                            });
                        }
                    })
                })
            } else {
                await interaction.channel.bulkDelete(amount, true).catch(error => {
                    console.error(error);
                    interaction.reply({ content: 'hubo un error al eliminar mensajes en el servidor!', ephemeral: true });
                });
                
                interaction.reply({content: 'mensajes eliminados', ephemeral: true})
            }
        } else {
            interaction.reply({content: 'no tienes permisos para ejecutar este comando', ephemeral: true})
        }
    },
};