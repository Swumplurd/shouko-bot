require('dotenv').config();
const fs = require('node:fs');
const saveWaifu = require('./helpers/save-waifu');
const dbConnection = require('./database/config');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

/* Database conexion */
dbConnection();

/* Event Handling */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/* Command Handling */
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Hubo un error mientras se ejecutaba este comando!', ephemeral: true });
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId === 'saveWaifu') {
		saveWaifu(interaction);
	}
});

client.login(process.env.DISCORD_TOKEN);