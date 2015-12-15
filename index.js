'use strict';

// apply environment variables
const env = require('./env');
for (let i in env){
	process.env[i] = env[i];
}

let port = process.env.PORT || 3000;

require('./server/server')
	.init()
	.listen(port, () => console.log(`Server is up! Listening on ${port}.`));