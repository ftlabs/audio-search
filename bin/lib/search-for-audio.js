const debug = require('debug')('bin:lib:database');
const database = require('./database');

function scan(options){

	options.TableName = process.env.DATA_TABLE;

	return database.scan(options)
		.then(data => {
			return data.Items;
		})
		.catch(err => {
			debug(err);
			throw err;
		})
	;

}

module.exports = function(options){
	return scan(options);
};