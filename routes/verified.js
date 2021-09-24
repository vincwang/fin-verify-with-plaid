var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render(
		'verified', 
		{
			verifyId: req.query.id,
			verificationResultUrl: req.protocol + '://' + req.get('host') + '/?id=' + req.query.id
		}
	);
});

module.exports = router;