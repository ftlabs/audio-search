const debug = require('debug')('audio-search:routes:search');
const express = require('express');
const router = express.Router();

const search = require('../bin/lib/search-for-audio');
const getInfoForItem = require('../bin/lib/get-information-for-item');

const ONE_DAY = 86400;

router.get('/', (req, res) => {
	res.end();
});

router.get('/today', (req, res) => {

	search.after((Date.now() / 1000 | 0) - (ONE_DAY * 2))
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

router.get('/latest', (req, res) => {

	search.latest()
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			debug(err);
			res.status(500);
			res.json({
				status : 'err',
				message : 'An error occurred getting the latest audio articles.'
			});
		})
	;

});

router.get('/headline/:containing', (req, res) => {

	search.title(req.params.containing)
		.then(data => {
			debug(data);
			res.json(data);
		})
	;

});

module.exports = router;