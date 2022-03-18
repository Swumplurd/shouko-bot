const User = require("../models/User");

const saveWaifu = async(interaction) => {
    try {
        let waifu = interaction.message.embeds[0].image.url;
        let user_id = interaction.user.id

        let usuario = await User.findOne({user_id})
        if (!usuario) {
            return interaction.reply({content: 'primero ejecuta el comando /register', ephemeral: true})
        }

        const update = {
            waifu: waifu.toString(),
        }

        await User.findByIdAndUpdate(usuario.id, update, {new: true})

        return interaction.reply({content: 'tu waifu ha sido guardada', ephemeral: true})

    } catch (error) {
        console.log(error);
        interaction.reply({content: 'no fue posible guardar tu waifu', ephemeral: true})
    }
}

module.exports = saveWaifu;