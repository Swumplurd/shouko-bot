module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Bot listo! Logeado como ${client.user.tag}`);
	},
};