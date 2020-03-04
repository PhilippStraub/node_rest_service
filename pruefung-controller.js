//prüfungsmodel importieren
Pruefung = require('./pruefung-model');


//Index aufrufen
exports.index = (req, res) => {
    Pruefung.get((err, pruefungen) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Prüfungen erfolgreich erhalten.",
            data: pruefungen
        });
    });
};


//Neue Prüfung erstellen
exports.new = (req, res) => {
    //Prüfung schon vorhanden?
    Pruefung.find({ fach: req.body.fach, art: req.body.art, datum: req.body.datum}, (err, pruefungData) => {
        if(!pruefungData.length){

            //Neue Prüfung wird erstellt
            var pruefungData = new Pruefung();
            pruefungData.fach = req.body.fach;
            pruefungData.art = req.body.art;
            pruefungData.datum = req.body.datum;
            pruefungData.ort = req.body.ort;

            //Prüfung speichern und Error check machen
            pruefungData.save((err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    message: 'Neue Prüfung erstellt!',
                    data: pruefungData
                });
            });
        } else {
            res.json({
                status: "error",
                message: "Diese Prüfung hast du bereits angelegt.",
            });
        }
        
    });
 
};


//Prüfung einsehen
exports.view = (req, res) => {
    Pruefung.findById(req.params.pruefungData_id, (err, pruefungData) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'Prüfung wird geladen..',
            data: pruefungData
        });
    });
};


//Prüfung updaten
exports.update = (req, res) => {
    Pruefung.findById(req.params.pruefungData_id, (err, pruefungData) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        pruefungData.name = req.body.name;
        pruefungData.art = req.body.art;
        pruefungData.datum = req.body.datum;
        pruefungData.ort = req.body.ort;

        //Prüfung speichern und Error check
        pruefungData.save(function (err) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                message: 'Prüfung wurde aktualisiert.',
                data: pruefungData
            });
        });
    });
};


//Prüfung löschen
exports.delete = function (req, res) {
    Pruefung.remove({
        _id: req.params.pruefungData_id
    }, (err, pruefungData) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: 'Prüfung wurde erfolgreich entfernt.'
        });
    });
};