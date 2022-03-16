const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('registra un usuario'),
	async execute(interaction) {
        const user_id = interaction.user.id;

        try {
            let usuario = await User.findOne({user_id});
    
            if (usuario) {
                return interaction.reply({content: 'ya estas registrado', ephemeral: true});
            }
    
            usuario = new User({
                user_id: interaction.user.id,
                user: interaction.user.tag
            });
    
            await usuario.save();
    
            return interaction.reply({content: 'usuario registrado!', ephemeral: true});
        } catch (error) {
            console.log(error);
            return interaction.reply('No fue posible registrar al usuario!');
        }
	},
};
