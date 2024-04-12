const getConnection = require("../db");


const CommandeModel = {    
    // Méthode pour insérer des données dans la base de données
    insertDonnees: function(Date, DateRecep, Devis, Pack, Palette, callback) {
      const connection = getConnection();
      const query = 'INSERT INTO recep_tlse (Date,DateRecep, Devis, Pack, Palette) VALUES (? ,?, ?, ?, ?)';
      connection.query(query, [Date , DateRecep, Devis, Pack, Palette], (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'insertion des données :', error);
          callback(error, null);
          return;
        }
        console.log('Données insérées avec succès');
        callback(null, results);
      });
    }
  };
  
  // Exporter le modèle de données
  module.exports = CommandeModel;