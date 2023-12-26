const Exercice = require('../models/exercice');


exports.test = (req, res, next) => {
    res.send('Hello World');
};

//CRUD OPERATIONS

//GET ALL EXERCICES
exports.getExercices = (req, res, next) => {
    Exercice.findAll({
        attributes: ['group'],
        raw: true,
        group: ['group'],
    })
        .then(groups => {
            const promises = groups.map(group => {
                return Exercice.findAll({
                    where: {
                        group: group.group,
                    },
                }).then(exercices => ({
                    group: group.group,
                    exercices: exercices,
                }));
            });
            return Promise.all(promises);
        })
        .then(result => {
            const finalResult = result.map(item => ({
                group: item.group,
                exercices: item.exercices.map(exercice => ({
                    name: exercice.name,
                    link: exercice.link,
                })),
            }));
            res.status(200).json(finalResult);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//GET EXERCICES BY GROUP
exports.getExercicesByGroup = (req, res, next) => {
    const group = req.params.group;
    Exercice.findAll({
        where: {
            group: group,
        },
    })
        .then(exercices => {
            res.status(200).json(exercices);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//GET EXERCICE BY NAME
exports.getExerciceByName = (req, res, next) => {
    const exercice = req.params.name;
    Exercice.findOne({
        where: {
            name: exercice,
        },
    })
        .then(exercice => {
            if(!exercice) {
                res.status(404).json({ error: 'Exercice not found' });
            }
            res.status(200).json(exercice);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//CREATE EXERCICE
exports.createExercice = (req, res, next) => {
    const name = req.body.name;
    const group = req.body.group;
    const link = req.body.link;
    Exercice.create({
        name: name,
        group: group,
        link: link
    })
        .then(result => {
            res.status(201).json({ message: 'Exercice created', exercice: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//UPDATE EXERCICE
exports.updateExerciceLink = (req, res, next) => {
    const name = req.body.name;
    const group = req.body.group;
    const updatedLink = req.body.link;
    Exercice.findOne({
        where: {
            name: name,
            group: group,
        },
    })
        .then(exercice => {
            if(!exercice) {
                res.status(404).json({ error: 'Exercice not found' });
            }
            exercice.link = updatedLink;
            return exercice.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Exercice updated', exercice: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//UPDATE EXERCICE NAME
exports.updateExerciceName = (req, res, next) => {
    const name = req.params.name;
    const group = req.body.group;
    const updatedName = req.body.updatedName;
    Exercice.findOne({
        where: {
            name: name,
            group: group,
        },
    })
        .then(exercice => {
            if(!exercice) {
                res.status(404).json({ error: 'Exercice not found' });
            }
            exercice.name = updatedName;
            return exercice.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Exercice updated', exercice: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//DELETE EXERCICE
exports.deleteExercice = (req, res, next) => {
    const name = req.body.name;
    const group = req.body.group;
    Exercice.findOne({
        where: {
            name: name,
            group: group,
        },
    })
        .then(exercice => {
            if(!exercice) {
                res.status(404).json({ error: 'Exercice not found' });
            }
            return exercice.destroy();
        })
        .then(result => {
            res.status(200).json({ message: 'Exercice deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

};