var mongoose = require('mongoose');

//Dataschema
var pruefungsSchema = mongoose.Schema({
    fach: {
        type: String,
        required: true
    },
    art: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    ort: String   
}, { versionKey: false }
);

//Model exportieren
var Pruefung = module.exports = mongoose.model('pruefung', pruefungsSchema); //Mongoose takes the lower-cased and pluralized model name of pruefung to get the collection name of pruefung.
module.exports.get = (callback, limit) => { //module.exports is used for defining what a module exports and makes available through require().
    Pruefung.find(callback).limit(limit); //limit verhindert das komplette Datenbank zurückgegeben wird
}