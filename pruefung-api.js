//Eine Route ist ein Abschnitt des Express-Codes, der ein HTTP-Verb (GET, POST, PUT, DELETE usw.), 
//einen URL-Pfad und eine Funktion, die zur Handhabung dieses Musters aufgerufen wird, verbindet.
var router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'API available'
    });
});


//Controller einbinden
var pruefungController = require('./pruefung-controller');


//Routes
router.route('/pruefungen')
    .get(pruefungController.index)
    .post(pruefungController.new);
router.route('/pruefungen/:pruefungData_id')
    .get(pruefungController.view)
    .put(pruefungController.update)
    .delete(pruefungController.delete);

module.exports = router;
