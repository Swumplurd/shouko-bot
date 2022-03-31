module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`bot listo! logeado como ${client.user.tag}`);
	},
};