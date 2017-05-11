const debug = require('debug')('bin:lib:database');
const database = require('./database');

module.exports = function(options){

	options.TableName = process.env.DATA_TABLE;

	return database.scan(options, process.env.DATA_TABLE)
		.then(data => {
			return data.Items;
		})
		.catch(err => {
			debug(err);
			throw err;
		})
	;

};