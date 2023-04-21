async function loadEvents(client) {
    const { loadFiles } = require("../functions/fileloader")
    const ascii = require("ascii-table")
    const table = new ascii().setHeading("Events", "Status")

    await client.events.clear()

    const f = await loadFiles("events")
    f.forEach((file) => {
        const event = require(file)
        const execute = (...args) => event.execute(...args,client)
        client.events.set(event.name, execute)

        if(event.rest){
            if(event.once) client.rest.once(event.name, execute)
            else client.rest.on(event.name, execute)
        } else {
            if(event.once) client.once(event.name, execute)
            else client.on(event.name, execute)
        }

        table.addRow(event.name, "k")
    })

    return console.log(table.toString(), "\nLoaded events.")
}

module.exports = { loadEvents }