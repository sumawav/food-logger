const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Journal = require('../../models/Journal');
// @route   GET api/journal
// @desc    Get seven latest entries
// @access  Public
router.get('/', auth, (req, res) => res.send('Journal route'));

module.exports = router;
