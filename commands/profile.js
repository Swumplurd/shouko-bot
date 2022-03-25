const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const User = require('../models/User');
const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('obtiene banner del perfil del usuario')
		.addUserOption(option =>
            option.setName('user')
            .setDescription('ingresa un usuario')
        ),
    async execute(interaction) {
		let user_id;

		if (interaction.options.getUser('user')) user_id = interaction.options.getUser('user').id;
	    else user_id = interaction.user.id;

		const user = await User.findOne({user_id});

		if (!user || !user.waifu) return interaction.reply({ content: "usuario no registrado o sin waifus guardadas", ephemeral: true });
		
        const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');
		
		context.font = applyText(canvas, `${interaction.member.displayName}!`);
		context.fillStyle = '#ff0000';
		context.fillText(`❤️`, 310, canvas.height / 2);
		
		context.beginPath();
		context.arc(100, 125, 100, 0, Math.PI * 2, true);
		context.arc(600, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();
		
		const waifu = await Canvas.loadImage(user.waifu);
		context.drawImage(waifu, 500, 25, 200, 200);

		const avatar = await Canvas.loadImage(interaction.options.getUser('user') ? interaction.options.getUser('user').displayAvatarURL({ format: 'jpg' }) : interaction.user.displayAvatarURL({ format: 'jpg' }));
		context.drawImage(avatar, 0, 25, 200, 200);

		const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

		return interaction.reply({ files: [attachment] });
    },
};
