const express = require('express');
const router = express.Router();
const model = require('./mood-event.model');

router.get('/', async (req, res) => {
    await model.getMoodEvents()
    .then(moodEvents => res.json(moodEvents))
    .catch(err => {
        if(err.status) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    });
});

router.post('/', model.validateMoodEvent, async (req, res) => {
    await model.insertMoodEvent(req.body)
    .then(moodEvent => res.status(201).json({
        message: `Mood event ${moodEvent.id} created`,
        content: moodEvent
    }))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;