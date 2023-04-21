const { loadcommands } = require('../../handlers/commandhandler');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Ready!');

		loadcommands(client);
	},
};
