const { connexion } = require("./connexion/index.js");

async function DemarrerServeur() {
    try {
        const consumer = await connexion();
    } catch (error) {
        console.error("Erreur lors du démarrage du serveur:", error);
    }
}

DemarrerServeur();
