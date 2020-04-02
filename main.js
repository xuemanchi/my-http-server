/**
 * 主入口
 */

let http = require('http');
let path = require('path');
let url = require('url');
let fs = require('fs');
let mime = require('mime');

const merge = (config = {}) => {
	return {
		post: 3000,
		directory: process.cwd(),
		...config
	};
};

class Server {
	constructor (config) {
		this.config = merge(config);
	}
	start () {

		// 传入回调需要绑定bind修正this指向;
		let server = http.createServer(this.handleStart.bind(this));
		server.listen(this.config.port);
	}
	handleStart () {
		console.log(this.config);
	}
}

module.exports = Server;
