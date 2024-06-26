const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const Annonce = require('../models/Annonce');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride('_method'));

router.get('/index', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json({ annonces });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/newannonce', (req, res) => {
    res.render("formulaire");
});

router.post('/create', async (req, res) => {
    try {
        const nouvelleAnnonce = new Annonce({
            titre: req.body.titre,
            description: req.body.description,
            prix: req.body.prix,
            surface: req.body.surface,
            // caractéristiques: {
            //     chambres: req.body['caracteristiques.chambres'],
            //     jardin: req.body['caracteristiques.jardin'] === 'on',
            //     balcon: req.body['caracteristiques.balcon'] === 'on'
            // }
        });
        await nouvelleAnnonce.save();
        res.status(201).json({ message: "Annonce créer!" }); 
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/view/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        if (!annonce) {
            return res.status(404).send('Annonce non trouvée');
        }
        res.render('view', { annonce });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



router.get('/get/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        if (!annonce) {
            return res.status(404).send('Annonce non trouvée');
        }
        res.json({ annonce});
    } catch (err) {
        res.status(500).json({ message: "ID non valide ! "});
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { titre,description,prix,surface } = req.body
        
        await Annonce.findByIdAndUpdate(req.params.id, 
            { titre,description,prix,surface });
        
        res.json({message: "Annonce modifiée !"});
    } catch (err) {
        res.status(400).json({message: "Erreur de la modification , mauvais ID "});
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Annonce.findByIdAndDelete(req.params.id);
        res.json({message: "Annonce supprimée ! "});
    } catch (err) {
        res.status(400).json({message: "Annonce non modifiée , erreur mauvais ID !"});
    }
});


module.exports = router;
