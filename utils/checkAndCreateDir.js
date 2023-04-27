/**
 * The function checks if a directory exists and creates it if it doesn't.
 * @param dir - dir is a parameter that represents the directory path that needs to be checked and
 * created if it doesn't exist.
 */
const fs = require('fs');

const checkAndCreateDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

module.exports = checkAndCreateDir;
