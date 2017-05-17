const debug = require('debug')('bin:lib:database');
const database = require('./database');

const getInfoForItem = require('./get-information-for-item');

function scan(options){

	options.TableName = process.env.DATA_TABLE;

	return database.scan(options)
		.then(data => {
			return data.Items;
		})
		.then(Items => {

			const P = Items.map(item => {
				
				return getInfoForItem(item.uuid)
					.then(data => {
						if(data === false){
							return false;
						}

						return {
							public : data,
							private : item
						};
					})
				;

			})

			return Promise.all(P)
				.then(items => {
					// Don't show the items that have been disabled.
					return items.filter(item => {
						return item !== false;
					});
				})
				

		})
		.catch(err => {
			debug(err);
			throw err;
		})
	;

}

// Don't expose private information client-side.
function getPublic(items){
	return items.map(item => {
		return item.public;
	});
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
		.then(items => getPublic(items))
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
		.then(items => getPublic(items))
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
		.then(items => getPublic(items))
		.catch(err => {
			debug(err);
			return [];
		})
	;

}

function getMostRecentAudioArticles(MAX = 10){

	const twoWeeksAgo = (new Date() / 1000 | 0) - (86400 * 14);

	return scan({
			FilterExpression : `#absorb > :time`,
			ExpressionAttributeNames : {
				'#absorb' : 'absorb_time'
			},
			ExpressionAttributeValues : {
				':time' : twoWeeksAgo
			}
		})
		.then(data => {
			debug(data);

			data.sort( (a, b) => {
				debug(a, b);
				if(a.private['unix-pubdate'] >= b.private['unix-pubdate']){
					return -1
				} else {
					return 1;
				}

			});

			return data.slice(0, MAX);
		})
		.then(items => getPublic(items))
	;

}

module.exports = {
	title : searchForArticlesByTitle,
	after : searchForArticleAfterTime,
	before : searchForArticleBeforeTime,
	latest : getMostRecentAudioArticles
};