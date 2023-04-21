const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function loadFiles(dirname) {
	const f = await proGlob(
		`${process.cwd().replace(/\\/g, "/")}/${dirname}/**/*.js`
	);
	f.forEach((file) => delete require.cache[require.resolve(file)]);
	return f;
}

module.exports = { loadFiles };
