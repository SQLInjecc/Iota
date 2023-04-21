async function loadcommands(client) {
	const { loadfiles, loadFiles } = require("../functions/fileloader");
	const ascii = require("ascii-table");
	const table = new ascii().setHeading("Commands", "Status");

	await client.commands.clear();
	await client.subcommands.clear();

	let commandsArray = [];

	const f = await loadFiles("commands");
	f.forEach((file) => {
		const command = require(file);

		if (command.subcommand)
			return client.subcommands.set(command.subcommand, command);

		client.commands.set(command.data.name, command);

		commandsArray.push(command.data.toJSON());
		table.addRow(command.data.name, "k");
	});

	client.application.commands.set(commandsArray);

	return console.log(table.toString(), "\nLoaded cmds.");
}

module.exports = { loadcommands };
