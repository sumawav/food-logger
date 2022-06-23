const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name']
        );

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for that user' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Please title your profile.').not().isEmpty(),
            check('calories', 'Please enter your daily calories')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, calories, height, weight, goalWeight, macros } =
            req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.title = title;
        profileFields.calories = calories;
        if (height) profileFields.height = height;
        if (weight) profileFields.weight = weight;
        if (goalWeight) profileFields.goalWeight = goalWeight;
        if (macros) profileFields.macros = macros;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error.');
        }
    }
);

// @route   DELETE api/profile/
// @desc    Delete profile
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        res.json({ msg: 'Profile deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
