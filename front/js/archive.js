let archivesTable = document.getElementById('archivesTable');
let data; 

function renderTable() {
    console.log(data)
    const tbody = document.querySelector('table tbody');

    tbody.innerHTML = '';    

    data.forEach(item => {
        let tableRow = document.createElement('tr');

        let dateCell = document.createElement('td');
        dateCell.textContent = item.Date;
        tableRow.appendChild(dateCell);

        let dateRecepCell = document.createElement('td');
        dateRecepCell.textContent = item.DateRecep;
        tableRow.appendChild(dateRecepCell);

        let devisCell = document.createElement('td');
        devisCell.textContent = item.Devis;
        tableRow.appendChild(devisCell);

        let packCell = document.createElement('td');
        packCell.textContent = item.Pack;
        tableRow.appendChild(packCell);

        let paletteCell = document.createElement('td');
        paletteCell.textContent = item.Palette;
        tableRow.appendChild(paletteCell);

        tbody.appendChild(tableRow);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/commandes-expediees`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de réseau - ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseData => {
            data = responseData;
            renderTable();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            alert('Erreur lors de la récupération des données');
        });
});

// Fonction pour générer le fichier CSV à partir des données
function convertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // Définir les en-têtes de colonnes à inclure dans le CSV
    const headers = ['Date', 'DateRecep', 'Devis', 'Pack', 'Palette'];

    // Convertir les données en format CSV
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let j = 0; j < headers.length; j++) {
            if (j > 0) line += ',';
            line += array[i][headers[j]];
        }
        str += line + '\r\n';
    }
    
    return str;
}

// Fonction pour télécharger le fichier CSV
function downloadCSV(data) {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un lien pour télécharger le fichier
    const link = document.createElement('a');
    link.setAttribute('href', window.URL.createObjectURL(blob));
    link.setAttribute('download', 'export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Gérer le clic sur le bouton d'exportation
function handleExportButtonClick() {
    downloadCSV(data);
}

// Attacher l'événement de clic au bouton d'exportation
document.getElementById('exportBtn').addEventListener('click', handleExportButtonClick);
