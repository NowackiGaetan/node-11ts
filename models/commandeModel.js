const getConnection = require("../db");


const CommandeModel = {    
    // Méthode pour insérer des données dans la base de données
    insertDonnees: function(date, devis, pack, palette, callback) {
      const connection = getConnection();
      const query = 'INSERT INTO expe_fenouillet (devis, pack, palette) VALUES (?, ?, ?)';
      connection.query(query, [date ,devis, pack, palette], (error, results, fields) => {
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