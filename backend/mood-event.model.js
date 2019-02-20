const helper = require('./helpers');
const filename = './data/mood-events.json';
let moodEvents = require(filename);

const getMoodEvents = () => { 
    return new Promise((resolve, reject) => {
        if(moodEvents.length === 0) {
            reject({
                status: 202,
                message: 'No mood events'
            });
        }

        resolve(moodEvents);
    });
};

const insertMoodEvent = (newMoodData) => { 
    return new Promise((resolve, reject) => {
        const newMoodEvent = {
            ...newMoodData,
            id: helper.newId(),
            createdAt: helper.newDate()
        };

        moodEvents.push(newMoodEvent);

        helper.writeJSON(filename, moodEvents).then(() => {
            resolve();
        }, () => {
            reject();
        });
    });
};

const validateMoodEvent = (req, res, next) => {
    // mood should be an integer between 1 and 7
    // feelings should be an array with 1 or more items
    // comment should be a string (optional)

    const { mood, feelings, comment } = req.body;

    if(
        (Number.isInteger(mood) && mood >= 1 && mood <= 7)
        && (Array.isArray(feelings) && feelings.length > 0)
        && typeof comment === 'string'
    ) {
        next();
    } else {
        res.status(400).json({ message: 'Invalid post data' });
    }
}

module.exports = {
    getMoodEvents,
    insertMoodEvent,
    validateMoodEvent
};