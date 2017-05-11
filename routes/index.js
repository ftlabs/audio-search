const debug = require('debug')('audio-search:routes:search');
const express = require('express');
const router = express.Router();

const search = require('../bin/lib/search-for-audio');
const getInfoForItem = require('../bin/lib/get-information-for-item');

const ONE_DAY = 86400;

router.get('/', (req, res, next) => {
	res.end();
});

router.get('/today', (req, res, next) => {

	search({
			FilterExpression : `#absorb > :time`,
			ExpressionAttributeNames : {
				'#absorb' : 'absorb_time'
			},
			ExpressionAttributeValues : {
				':time' : (Date.now() / 1000 | 0) - (ONE_DAY * 2)
			}
		})
		.then(items => {

			const information = items.map(item => {

				return getInfoForItem(item.uuid)
					.then(data => {
						if(data === false){
							return false;
						}
						data.title = item.title
						return data;
					})
				;

			});

			return Promise.all(information);

		})
		.then(items => {
			res.json(items);
		})
		.catch(err => {
			debug(err);
			res.status(500).json({
				status : 'err',
				message : 'Unable to return results'
			});
		})
	;


});

module.exports = router;