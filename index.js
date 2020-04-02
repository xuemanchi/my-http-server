const { program } = require('commander');
let pkg = require('./package.json');
let Server = require('./main.js');

console.log('-------------Welcome to my-http-server-------------');
let config = {
	'-p, --port <port>': {
		description: 'set a http-server port',
		examples: `${pkg.name} -p 3000`
	},
	'-d, --directory <dir>': {
		description: 'set a http-server directory',
		examples: `${pkg.name} -d d`
	}
};

let entries = (config, cb) => {
	Object.entries(config).forEach(([key, option]) => {
		cb(key, option);
	});
};

// --help配置项
entries(config, (key, option) => {
	program.option(key, option.description);
});

// 帮助
program.on('--help', () => {
	console.log('Examples: ');
	entries(config, (key, option) => {
		console.log(' ' + option.examples);
	});
});

program.version(pkg.version);
program.name(pkg.name);
let userConfig = program.parse(process.argv);
new Server(userConfig).start();
