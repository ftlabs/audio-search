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

	search.after((Date.now() / 1000 | 0) - (ONE_DAY * 2))
		.then(items => {
			debug(items);
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

router.get('/headline/:containing', (req, res, next) => {

	search.title(req.params.containing)
		.then(data => {
			debug(data);
			res.json(data);
		})
	;

});

module.exports = router;