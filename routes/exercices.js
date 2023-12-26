const controller = require('../controllers/exercices');
const router = require('express').Router();

router.get('/', controller.getExercices);
router.get('/:group', controller.getExercicesByGroup);
router.get('/:name', controller.getExerciceByName);
router.post('/', controller.createExercice);
router.put('/update/link', controller.updateExerciceLink);
router.put('/update/name', controller.updateExerciceName);
router.delete('/del', controller.deleteExercice);
router.get('/test', controller.test);

module.exports = router;