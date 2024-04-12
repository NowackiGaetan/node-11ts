const express = require("express");
const router = express.Router();
const getConnection = require("../db");
const CommandeModel = require('../models/commandeModel');


router.get("/", (req, res) => {
    const connection = getConnection()
  connection.query("SELECT * FROM expe_fenouillet", (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      return
    } else {
      res.json(rows);
    }
  });
});

router.get("/devis/:devis", (req, res) => {
    const connection = getConnection()
    const devis = req.params.devis
  connection.query("SELECT * FROM expe_fenouillet where devis = ?",[devis], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      return
    } else {
        if (rows.length > 0) {
            res.json(rows[0]); // Renvoyer la première ligne (seule ligne attendue)
        } else {
            res.status(404).json({ error: 'Devis non trouvé' }); 
        }
    }
  });
});

router.get("/palette/:palette", (req, res) => {
    const connection = getConnection()
    const palette = req.params.palette
  connection.query("SELECT * FROM expe_fenouillet where palette = ?",[palette], (err, rows) => {
    if (err) {
      console.log(palette)
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      return
    } else {
        if (rows.length > 0) {
            res.json(rows); 
        } else {
            res.status(404).json({ error: 'palette non trouvée' }); 
        }
    }
  });
});

router.get("/pack/:pack", (req, res) => {
  const connection = getConnection()
  const pack = req.params.pack
  connection.query("SELECT * FROM expe_fenouillet where pack = ?",[pack], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      return
    } else {
        if (rows.length > 0) {
            res.json(rows[0]); // Renvoyer la première ligne (seule ligne attendue)
        } else {
            res.status(404).json({ error: 'pack non trouvé' }); 
        }
    }
  });
});

router.post("/", (req, res) => {
  const { date, devis, pack, palette } = req.body;

  console.log('Requête POST reçue avec les données suivantes :', req.body);

  // Vérifier si toutes les données requises sont présentes
  if (!date || !devis || !palette || !pack) {
      console.log('Données manquantes dans la requête.');
      res.status(400).json({ error: 'Toutes les données (date, devis, palette, pack) sont requises' });
      return;
  }

  const connection = getConnection();

  // Insérer les données dans la base de données
  const query = 'INSERT INTO expe_fenouillet (date, devis, palette, pack) VALUES (?, ?, ?, ?)';
  connection.query(query, [date, devis, palette, pack], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données :', error);
      res.status(500).send('Erreur lors de l\'insertion des données');
      return;
    }
    console.log('Données insérées avec succès');
    res.status(201).send('Données insérées avec succès');
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id; // Récupérer l'ID du devis à supprimer

  const connection = getConnection();
 
  connection.query("DELETE FROM expe_fenouillet WHERE id = ?", [id], (err, result) => {
      if (err) {
          console.error("Erreur lors de la suppression du devis :", err);
          res.status(500).json({ error: 'Erreur lors de la suppression du devis dans la base de données' });
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Aucun devis trouvé avec cet ID' }); 
          return;
      }
      console.log("Devis supprimé avec l'ID :", id);
      res.status(200).json({ message: 'Devis supprimé avec succès' });
  });
});


module.exports = router;
