const express = require('express');
const router = express.Router();
const { getEggs, addEgg } = require('../controllers/eggcontroller');

router.get('/', getEggs);
router.post('/', addEgg);

module.exports = router;
