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

module.exports = {
    getMoodEvents,
    insertMoodEvent
};