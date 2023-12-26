const controller = require('../controllers/exercices');
const router = require('express').Router();

// TEST ROUTE
router.get('/test', controller.test);

// CRUD ROUTES
router.get('/', controller.getExercices);
router.get('/:name', controller.getExerciceByName);
router.get('/:group', controller.getExercicesByGroup);
router.post('/', controller.createExercice);
router.put('/update/link', controller.updateExerciceLink);
router.put('/update/name', controller.updateExerciceName);
router.delete('/del', controller.deleteExercice);


module.exports = router;
