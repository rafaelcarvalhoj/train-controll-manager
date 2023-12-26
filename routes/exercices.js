const controller = require('../controllers/exercices');
const router = require('express').Router();

// TEST ROUTE
router.get('/test', controller.test);

// CRUD ROUTES
router.get('/', controller.getExercices);
router.get('/name/:name', controller.getExerciceByName);
router.get('/group/:group', controller.getExercicesByGroup);
router.post('/', controller.createExercice);
router.put('/link', controller.updateExerciceLink);
router.put('/name/:name', controller.updateExerciceName);
router.delete('/del', controller.deleteExercice);


module.exports = router;
