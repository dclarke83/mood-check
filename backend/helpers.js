const uuid = require('uuid');
const fs = require('fs');

const newDate = () => { 
    return new Date().toString();
}

const newId = () => {
    return uuid();
}

const writeJSON = (filename, content) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(content)
        fs.writeFileSync(filename, data, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

module.exports = {
    newDate,
    newId,
    writeJSON
};