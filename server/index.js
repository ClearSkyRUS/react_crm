const static = require('node-static');
const http = require('http');

const file = new (static.Server)(__dirname, {
	gzip: true,
	gzip: /^\/text/,
});

http.createServer(function (req, res) {
	req.addListener('end', function () {
		file.serve(req, res, function (e) {
			if (e && (e.status === 404)) {
				file.serveFile('/index.html', 200, {}, req, res);
			}
		});
	}).resume();
}).listen(8080, '0.0.0.0', () => {
	console.log(`server on 8080 started!`)
})