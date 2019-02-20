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

module.exports = {
    getMoodEvents
};