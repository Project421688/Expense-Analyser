const express = require('express');
const router = express.Router();
const { getEggs, addEgg, getLastFiveEggs   } = require('../controllers/eggcontroller');

router.get('/', getEggs);
router.post('/', addEgg);
router.get('/last5', getLastFiveEggs);

module.exports = router;
