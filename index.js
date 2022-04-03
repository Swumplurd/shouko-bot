require('dotenv').config();
const fs = require('node:fs');
const saveWaifu = require('./helpers/save-waifu');
const dbConnection = require('./database/config');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES] });

/* Database connection */
dbConnection();

/* Event handling */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

/* Button handling */
client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === 'saveWaifu') saveWaifu(interaction);
});

/* Command handling */
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
		await interaction.reply({ content: 'hubo un error mientras se ejecutaba este comando!', ephemeral: true });
	}
});

client.login(process.env.DISCORD_TOKEN);