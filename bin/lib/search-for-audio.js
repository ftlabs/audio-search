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

function searchForArticlesByTitle(title){
	return scan({
			FilterExpression : '(contains(#title, :title))',
			ExpressionAttributeNames : {
				'#title' : 'title'
			},
			ExpressionAttributeValues : {
				':title' : title
			}
		})
		.catch(err => {
			debug(err);
			return [];
		})
	;
}

function searchForArticleAfterTime(unixTime){

	return scan({
			FilterExpression : `#absorb > :time`,
			ExpressionAttributeNames : {
				'#absorb' : 'absorb_time'
			},
			ExpressionAttributeValues : {
				':time' : unixTime
			}
		})
		.catch(err => {
			debug(err);
			return [];
		})
	;

}

function searchForArticleBeforeTime(unixTime){
	return scan({
			FilterExpression : `#absorb < :time`,
			ExpressionAttributeNames : {
				'#absorb' : 'absorb_time'
			},
			ExpressionAttributeValues : {
				':time' : unixTime
			}
		})
		.catch(err => {
			debug(err);
			return [];
		})
	;

}

module.exports = {
	title : searchForArticlesByTitle,
	after : searchForArticleAfterTime,
	before : searchForArticleBeforeTime
};