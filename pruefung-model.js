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
    ort: {
        type: String,
        required: true
    }}, { versionKey: false }
);
//Model exportieren
module.exports = mongoose.model(
    'pruefung',
    pruefungsSchema);

//Mongoose takes the lower-cased and pluralized model name of pruefung to get the collection name of pruefung.

//module.exports is used for defining what a module exports and makes available through require().
//Durch das zusätzliche .get und der anschließenden Def der Funktion wird definiert was beim ausführen der Funktion in einer anderen .js File gemacht wird in die das Modul importiert wird. https://teamtreehouse.com/community/i-dont-understand-what-moduleexportsget-get-does-can-someone-please-elaborate
//limit verhindert das komplette Datenbank zurückgegeben wird