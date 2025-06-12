const db = require('../databases/connection');

const estadoModel = {
    list: (callback) => {
        db.all(`SELECT * FROM estado`, [], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    }
};
module.exports = estadoModel;