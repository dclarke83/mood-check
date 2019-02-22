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
            resolve(newMoodEvent);
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
    let errors = [];
    let valid = true;

    if(!Number.isInteger) { errors.push('Mood must be a whole number'); valid = false; }
    if(!(mood >=1 && mood <= 7)) { errors.push('Mood must be between 1 and 7'); valid = false; }
    if(!(Array.isArray(feelings) && feelings.length > 0)) { errors.push('One or more feelings must be supplied'); valid = false; }
    if(typeof comment !== 'string') { errors.push('The comment should be a string'); valid = false; }

    if(valid) {
        next();
    } else {
        res.status(400).json({ message: errors.join('<br />') });
    }
}

module.exports = {
    getMoodEvents,
    insertMoodEvent,
    validateMoodEvent
};